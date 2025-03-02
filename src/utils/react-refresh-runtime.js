const exports = {}

/**
 * @license React
 * react-refresh-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

if ("development" !== "production") {
  ;(function () {
    'use strict'

    // React组件类型的Symbol标识
    var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref')
    var REACT_MEMO_TYPE = Symbol.for('react.memo')

    // 使用WeakMap或Map来存储组件信息
    var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map

    // 存储所有组件家族的映射关系
    var allFamiliesByID = new Map()
    var allFamiliesByType = new PossiblyWeakMap()
    var allSignaturesByType = new PossiblyWeakMap()

    // 存储已更新的组件家族
    var updatedFamiliesByType = new PossiblyWeakMap()

    // 存储待处理的更新队列
    var pendingUpdates = []

    // 存储渲染器辅助工具
    var helpersByRendererID = new Map()
    var helpersByRoot = new Map()

    // 跟踪已挂载的根节点
    var mountedRoots = new Set()
    // 记录失败的根节点
    var failedRoots = new Set()

    // 存储根节点对应的DOM元素
    var rootElements = typeof WeakMap === 'function' ? new WeakMap() : null

    // 标记是否正在执行刷新操作
    var isPerformingRefresh = false

    /**
     * 计算组件的完整签名键
     * @param {object} signature - 组件签名对象
     * @returns {string} 完整的签名键
     */
    function computeFullKey(signature) {
      if (signature.fullKey !== null) {
        return signature.fullKey
      }

      var fullKey = signature.ownKey
      var hooks

      try {
        hooks = signature.getCustomHooks()
      } catch (err) {
        // 如果获取自定义Hook失败，强制重新挂载
        signature.forceReset = true
        signature.fullKey = fullKey
        return fullKey
      }

      // 遍历所有Hook，计算完整的签名键
      for (var i = 0; i < hooks.length; i++) {
        var hook = hooks[i]

        if (typeof hook !== 'function') {
          signature.forceReset = true
          signature.fullKey = fullKey
          return fullKey
        }

        var nestedHookSignature = allSignaturesByType.get(hook)

        if (nestedHookSignature === undefined) {
          continue
        }

        var nestedHookKey = computeFullKey(nestedHookSignature)

        if (nestedHookSignature.forceReset) {
          signature.forceReset = true
        }

        fullKey += '\n---\n' + nestedHookKey
      }

      signature.fullKey = fullKey
      return fullKey
    }

    /**
     * 比较两个组件类型的签名是否相等
     * @param {function} prevType - 之前的组件类型
     * @param {function} nextType - 新的组件类型
     * @returns {boolean} 签名是否相等
     */
    function haveEqualSignatures(prevType, nextType) {
      var prevSignature = allSignaturesByType.get(prevType)
      var nextSignature = allSignaturesByType.get(nextType)

      if (prevSignature === undefined && nextSignature === undefined) {
        return true
      }

      if (prevSignature === undefined || nextSignature === undefined) {
        return false
      }

      if (computeFullKey(prevSignature) !== computeFullKey(nextSignature)) {
        return false
      }

      if (nextSignature.forceReset) {
        return false
      }

      return true
    }

    /**
     * 判断是否为React类组件
     * @param {function} type - 组件类型
     * @returns {boolean} 是否为React类组件
     */
    function isReactClass(type) {
      return type.prototype && type.prototype.isReactComponent
    }

    /**
     * 判断两个组件类型之间是否可以保持状态
     * @param {function} prevType - 之前的组件类型
     * @param {function} nextType - 新的组件类型
     * @returns {boolean} 是否可以保持状态
     */
    function canPreserveStateBetween(prevType, nextType) {
      if (isReactClass(prevType) || isReactClass(nextType)) {
        return false
      }

      if (haveEqualSignatures(prevType, nextType)) {
        return true
      }

      return false
    }

    /**
     * 解析组件家族
     * @param {function} type - 组件类型
     * @returns {object} 组件家族对象
     */
    function resolveFamily(type) {
      return updatedFamiliesByType.get(type)
    }

    /**
     * 克隆Map对象
     * @param {Map} map - 要克隆的Map对象
     * @returns {Map} 克隆后的Map对象
     */
    function cloneMap(map) {
      var clone = new Map()
      map.forEach(function (value, key) {
        clone.set(key, value)
      })
      return clone
    }

    /**
     * 克隆Set对象
     * @param {Set} set - 要克隆的Set对象
     * @returns {Set} 克隆后的Set对象
     */
    function cloneSet(set) {
      var clone = new Set()
      set.forEach(function (value) {
        clone.add(value)
      })
      return clone
    }

    /**
     * 安全地获取对象属性
     * @param {object} object - 目标对象
     * @param {string} property - 属性名
     * @returns {*} 属性值
     */
    function getProperty(object, property) {
      try {
        return object[property]
      } catch (err) {
        return undefined
      }
    }

    /**
     * 执行React刷新操作
     * @returns {null|object} 更新结果
     */
    function performReactRefresh() {
      if (pendingUpdates.length === 0) {
        return null
      }

      if (isPerformingRefresh) {
        return null
      }

      isPerformingRefresh = true

      try {
        var staleFamilies = new Set()
        var updatedFamilies = new Set()
        var updates = pendingUpdates
        pendingUpdates = []

        updates.forEach(function (_ref) {
          var family = _ref[0],
              nextType = _ref[1]

          var prevType = family.current
          updatedFamiliesByType.set(prevType, family)
          updatedFamiliesByType.set(nextType, family)
          family.current = nextType

          // 判断是重新渲染还是重新挂载
          if (canPreserveStateBetween(prevType, nextType)) {
            updatedFamilies.add(family)
          } else {
            staleFamilies.add(family)
          }
        })

        return {
          updatedFamilies: updatedFamilies, // 将重新渲染并保持状态的组件家族
          staleFamilies: staleFamilies // 需要重新挂载的组件家族
        }
      } finally {
        isPerformingRefresh = false
      }
    }

    // 导出模块
    exports.__esModule = true
    exports.performReactRefresh = performReactRefresh
    exports.register = register
    exports.reset = reset
  })()
}
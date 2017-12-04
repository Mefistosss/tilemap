var Tilemap =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(7);
var Subscription_1 = __webpack_require__(3);
var Observer_1 = __webpack_require__(8);
var rxSubscriber_1 = __webpack_require__(4);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(16);
var isObject_1 = __webpack_require__(17);
var isFunction_1 = __webpack_require__(7);
var tryCatch_1 = __webpack_require__(5);
var errorObject_1 = __webpack_require__(2);
var UnsubscriptionError_1 = __webpack_require__(18);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(0);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(2);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(0);
var toSubscriber_1 = __webpack_require__(15);
var observable_1 = __webpack_require__(19);
var pipe_1 = __webpack_require__(20);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(6);
var Subscriber_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(3);
var ObjectUnsubscribedError_1 = __webpack_require__(23);
var SubjectSubscription_1 = __webpack_require__(24);
var rxSubscriber_1 = __webpack_require__(4);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tilemap_1 = __webpack_require__(11);
exports.Tilemap = tilemap_1.Tilemap;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ajax_1 = __webpack_require__(12);
var Subject_1 = __webpack_require__(9);
var tile_1 = __webpack_require__(25);
var image_loader_1 = __webpack_require__(26);
var camera_1 = __webpack_require__(27);
var Tilemap = /** @class */ (function () {
    function Tilemap(canvasId, pathToConfig, options) {
        this.tiles = [];
        this.width = 0;
        this.height = 0;
        this.isReady = false;
        this.additionalImages = [];
        this.startX = 0;
        this.startY = 0;
        this.ready = new Subject_1.Subject();
        this.click = new Subject_1.Subject();
        this.showTiles = new Subject_1.Subject();
        this.tilesLoader = new Subject_1.Subject();
        this.options = {
            grid: true,
            numberOfTiles: false,
            indexOfTiles: false,
            gridColor: 'black',
            additionalImages: []
        };
        this.node = document.getElementById(canvasId);
        this.options = Object.assign(this.options, options);
        this.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        this.context = this.node.getContext('2d');
        if (this.context) {
            this.init(pathToConfig);
        }
        this.resizeHandler = this.resize.bind(this);
    }
    Tilemap.prototype.getCanvasSize = function () {
        var parent = this.node.parentNode;
        this.width = parent.offsetWidth;
        this.height = parent.offsetHeight;
    };
    Tilemap.prototype.setCanvasSize = function () {
        this.node.width = this.width;
        this.node.height = this.height;
    };
    Tilemap.prototype.setEvents = function () {
        var _this = this;
        var x, y, isMove, moved = true;
        ;
        var start = function (_x, _y) {
            x = _x;
            y = _y;
            isMove = true;
            _this.camera.stop();
        };
        var move = function (_x, _y) {
            if (isMove) {
                moved = true;
                _this.camera.setPosition(_x - x, _y - y);
                x = _x;
                y = _y;
            }
        };
        var end = function (_x, _y) {
            if (isMove && !moved) {
                var point = _this.camera.getIndexOfTile(_x, _y);
                var tile = _this.tiles[point.y][point.x];
                // this.click.onNext('foo');
                _this.click.next(tile);
            }
            moved = false;
            isMove = false;
        };
        if (this.isMobile) {
            this.node.addEventListener('touchstart', function (e) {
                e.preventDefault();
                start(e.touches[0].pageX, e.touches[0].pageY);
            });
            this.node.addEventListener('touchmove', function (e) {
                e.preventDefault();
                move(e.touches[0].pageX, e.touches[0].pageY);
            });
            this.node.addEventListener('touchend', function (e) {
                e.preventDefault();
                end(e.touches[0].pageX, e.touches[0].pageY);
            });
            document.body.addEventListener('touchend', function (e) {
                e.preventDefault();
                end(e.touches[0].pageX, e.touches[0].pageY);
            });
        }
        else {
            this.node.addEventListener('mousedown', function (e) {
                e.preventDefault();
                start(e.offsetX, e.offsetY);
            });
            this.node.addEventListener('mousemove', function (e) {
                e.preventDefault();
                move(e.offsetX, e.offsetY);
            });
            document.body.addEventListener('mouseup', function (e) {
                e.preventDefault();
                end(e.offsetX, e.offsetY);
            });
        }
        window.addEventListener('resize', this.resizeHandler);
    };
    Tilemap.prototype.draw = function () {
        var _this = this;
        var tiles = this.camera.getTiles();
        this.context.fillRect(0, 0, this.width, this.height);
        tiles.forEach(function (tilePositions) {
            var tile = _this.tiles[tilePositions.y][tilePositions.x], posX = tile.x * tile.width + _this.camera.X, posY = tile.y * tile.height + _this.camera.Y;
            _this.context.drawImage(_this.loader.image, tile.imageX, tile.imageY, tile.width, tile.height, posX, posY, tile.width, tile.height);
            var additionalImages = tile.getImages();
            if (additionalImages) {
                additionalImages.forEach(function (image) {
                    _this.context.drawImage(image, 0, 0, tile.width, tile.height, posX, posY, tile.width, tile.height);
                });
            }
            if (_this.options.numberOfTiles) {
                // this.context.fillStyle = this.options.gridColor;
                _this.context.textAlign = "start";
                _this.context.textBaseline = "top";
                _this.context.font = "12px Arial";
                _this.context.fillText(tile.ID + '', posX + 1, posY + 1);
            }
            if (_this.options.indexOfTiles) {
                // this.context.fillStyle = this.options.gridColor;
                _this.context.textAlign = "start";
                _this.context.textBaseline = "bottom";
                _this.context.font = "12px Arial";
                _this.context.fillText(tile.x + ' ' + tile.y, posX + 1, posY + 32);
            }
        });
        if (this.options.grid) {
            this.drawGrid(this.tiles[tiles[0].x][tiles[0].y]);
        }
    };
    Tilemap.prototype.drawGrid = function (tile) {
        var startPoint, point, tileset = this.mapConfig.tilesets[0], width = this.width, height = this.height;
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.options.gridColor;
        startPoint = tile.y * tile.width + this.camera.X;
        point = startPoint - tileset.tilewidth;
        do {
            point += tileset.tilewidth;
            this.context.moveTo(point - 0.5, 0);
            this.context.lineTo(point - 0.5, height);
        } while (point < startPoint + width);
        startPoint = tile.x * tile.height + this.camera.Y;
        point = startPoint - tileset.tileheight;
        do {
            point += tileset.tileheight;
            this.context.moveTo(0, point - 0.5);
            this.context.lineTo(width, point - 0.5);
        } while (point < startPoint + height);
        this.context.stroke();
    };
    Tilemap.prototype.getConfig = function (url, callback) {
        ajax_1.ajax.getJSON(url)
            .subscribe(function (data) { callback(data); }, function (err) { console.log('Can not load config'); });
    };
    Tilemap.prototype.loadImage = function (callback) {
        var _this = this;
        var images = this.options.additionalImages.length + 1, currentLoadedImages = 0;
        this.loader = new image_loader_1.ImageLoader(this.mapConfig.tilesets[0].image, function (err, v) {
            if (!err) {
                currentLoadedImages += 1;
                if (images === currentLoadedImages) {
                    callback();
                }
            }
        });
        if (this.options.additionalImages.length) {
            this.options.additionalImages.forEach(function (src) {
                var loader = new image_loader_1.ImageLoader(src, function (err, v) {
                    if (!err) {
                        currentLoadedImages += 1;
                        if (images === currentLoadedImages) {
                            callback();
                        }
                    }
                });
                loader.load();
                _this.additionalImages.push(loader);
            });
        }
        this.loader.load();
    };
    Tilemap.prototype.getPositionPerNumber = function (n, tileset) {
        var rows = Math.floor(n / tileset.columns);
        return [(n - 1) % tileset.columns, rows];
    };
    Tilemap.prototype.createTiles = function () {
        var _this = this;
        var layer = this.mapConfig.layers[0];
        var tileset = this.mapConfig.tilesets[0];
        var tileCount = tileset.tilecount;
        var arr = [];
        this.mapConfig.layers[0].data.forEach(function (t, i) {
            var y = Math.floor(i / layer.height);
            var x = i % layer.width;
            var pos = _this.getPositionPerNumber(t, tileset);
            var imgPosX = tileset.spacing + pos[0] * (tileset.tilewidth + tileset.margin);
            var imgPosY = tileset.spacing + pos[1] * (tileset.tileheight + tileset.margin);
            arr.push(new tile_1.Tile(t, tileset.tilewidth, tileset.tileheight, x, y, imgPosX, imgPosY));
            if (x === layer.width - 1) {
                _this.tiles.push(arr);
                arr = [];
            }
        });
    };
    Tilemap.prototype.init = function (pathToConfig) {
        var _this = this;
        this.getConfig(pathToConfig, function (data) {
            _this.mapConfig = data;
            var tileset = _this.mapConfig.tilesets[0];
            if (!_this.mapConfig.tilesets[0].columns) {
                _this.mapConfig.tilesets[0].columns = Math.floor((tileset.imagewidth - tileset.spacing) / (tileset.tilewidth + tileset.margin));
            }
            var layer = _this.mapConfig.layers[0];
            _this.getCanvasSize();
            _this.setCanvasSize();
            _this.camera = new camera_1.Camera(_this.width, _this.height, tileset.tilewidth * layer.width, tileset.tileheight * layer.height, tileset.tilewidth, tileset.tileheight);
            _this.camera.setStartPosition(_this.startX, _this.startY);
            _this.camera.drawEvent.subscribe(function () {
                _this.draw();
            });
            _this.camera.animationEndEvent.subscribe(function () {
                _this.sendShowTiles();
            });
            _this.loadImage(function () {
                _this.createTiles();
                _this.setEvents();
                _this.draw();
                _this.isReady = true;
                _this.ready.next();
                _this.sendShowTiles();
            });
        });
    };
    Tilemap.prototype.sendShowTiles = function () {
        this.showTiles.next(this.tilesFilter(this.camera.getTiles()));
        this.tilesLoader.next({ isLoading: true });
    };
    Tilemap.prototype.tilesFilter = function (tiles) {
        var _this = this;
        var arr = [];
        tiles.forEach(function (point) {
            var tile = _this.tiles[point.y][point.x];
            if (tile.Status === 0) {
                tile.setRequestingStatus();
                arr.push(point);
            }
        });
        return arr;
    };
    Tilemap.prototype.isAllLoaded = function () {
        var i, result = true, points = this.camera.getTiles(), l = points.length;
        for (i = 0; i < l; i++) {
            var point = points[i], tile = this.tiles[point.y][point.x];
            if (tile.Status !== 2) {
                result = false;
                break;
            }
        }
        return result;
    };
    Tilemap.prototype.resize = function () {
        this.getCanvasSize();
        this.setCanvasSize();
        this.camera.resize(this.width, this.height);
        this.draw();
    };
    Object.defineProperty(Tilemap.prototype, "readyEvent", {
        get: function () {
            var _this = this;
            if (this.isReady) {
                setTimeout(function () { _this.ready.next(); }, 50);
            }
            return this.ready;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tilemap.prototype, "clickEvent", {
        get: function () {
            return this.click;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tilemap.prototype, "showTilesEvent", {
        get: function () {
            return this.showTiles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tilemap.prototype, "tilesLoaderEvent", {
        get: function () {
            return this.tilesLoader;
        },
        enumerable: true,
        configurable: true
    });
    Tilemap.prototype.moveTo = function (indexX, indexY) {
        if (this.isReady) {
            this.camera.move(indexX, indexY);
        }
        else {
            this.startX = indexX;
            this.startY = indexY;
            if (this.camera) {
                this.camera.setStartPosition(this.startX, this.startY);
            }
        }
    };
    Tilemap.prototype.setLayerToTile = function (options) {
        var tile = this.tiles[options.y][options.x];
        tile.setRequestedStatus();
        if (!options.empty) {
            tile.addImage(this.additionalImages[options.additionalImage].image);
            this.draw();
        }
        if (this.isAllLoaded()) {
            this.tilesLoader.next({ isLoading: false });
        }
    };
    Tilemap.prototype.destroy = function () {
        this.node.parentNode.removeChild(this.node);
        window.removeEventListener('resize', this.resizeHandler);
    };
    return Tilemap;
}());
exports.Tilemap = Tilemap;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AjaxObservable_1 = __webpack_require__(13);
exports.ajax = AjaxObservable_1.AjaxObservable.create;
//# sourceMappingURL=ajax.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(0);
var tryCatch_1 = __webpack_require__(5);
var errorObject_1 = __webpack_require__(2);
var Observable_1 = __webpack_require__(6);
var Subscriber_1 = __webpack_require__(1);
var map_1 = __webpack_require__(22);
function getCORSRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else if (!!root_1.root.XDomainRequest) {
        return new root_1.root.XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new root_1.root.ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                }
            }
            return new root_1.root.ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers) {
    if (headers === void 0) { headers = null; }
    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
exports.ajaxGet = ajaxGet;
;
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
exports.ajaxPost = ajaxPost;
;
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
exports.ajaxDelete = ajaxDelete;
;
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
exports.ajaxPut = ajaxPut;
;
function ajaxPatch(url, body, headers) {
    return new AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
}
exports.ajaxPatch = ajaxPatch;
;
var mapResponse = map_1.map(function (x, index) { return x.response; });
function ajaxGetJSON(url, headers) {
    return mapResponse(new AjaxObservable({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: headers
    }));
}
exports.ajaxGetJSON = ajaxGetJSON;
;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var AjaxObservable = (function (_super) {
    __extends(AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
        _super.call(this);
        var request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        this.request = request;
    }
    AjaxObservable.prototype._subscribe = function (subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    };
    /**
     * Creates an observable for an Ajax request with either a request object with
     * url, headers, etc or a string for a URL.
     *
     * @example
     * source = Rx.Observable.ajax('/products');
     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
     *
     * @param {string|Object} request Can be one of the following:
     *   A string of the URL to make the Ajax call.
     *   An object with the following properties
     *   - url: URL of the request
     *   - body: The body of the request
     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
     *   - async: Whether the request is async
     *   - headers: Optional headers
     *   - crossDomain: true if a cross domain request, else false
     *   - createXHR: a function to override if you need to use an alternate
     *   XMLHttpRequest implementation.
     *   - resultSelector: a function to use to alter the output value type of
     *   the Observable. Gets {@link AjaxResponse} as an argument.
     * @return {Observable} An observable sequence containing the XMLHttpRequest.
     * @static true
     * @name ajax
     * @owner Observable
    */
    AjaxObservable.create = (function () {
        var create = function (urlOrRequest) {
            return new AjaxObservable(urlOrRequest);
        };
        create.get = ajaxGet;
        create.post = ajaxPost;
        create.delete = ajaxDelete;
        create.put = ajaxPut;
        create.patch = ajaxPatch;
        create.getJSON = ajaxGetJSON;
        return create;
    })();
    return AjaxObservable;
}(Observable_1.Observable));
exports.AjaxObservable = AjaxObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AjaxSubscriber = (function (_super) {
    __extends(AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
        _super.call(this, destination);
        this.request = request;
        this.done = false;
        var headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
        this.send();
    }
    AjaxSubscriber.prototype.next = function (e) {
        this.done = true;
        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        destination.next(response);
    };
    AjaxSubscriber.prototype.send = function () {
        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
        var createXHR = request.createXHR;
        var xhr = tryCatch_1.tryCatch(createXHR).call(request);
        if (xhr === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            this.xhr = xhr;
            // set up the events before open XHR
            // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
            // You need to add the event listeners before calling open() on the request.
            // Otherwise the progress events will not fire.
            this.setupEvents(xhr, request);
            // open XHR
            var result = void 0;
            if (user) {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
            }
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
            // timeout, responseType and withCredentials can be set once the XHR is open
            if (async) {
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
            }
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!request.withCredentials;
            }
            // set headers
            this.setHeaders(xhr, headers);
            // finally send the request
            result = body ? tryCatch_1.tryCatch(xhr.send).call(xhr, body) : tryCatch_1.tryCatch(xhr.send).call(xhr);
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
        }
        return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
            return body;
        }
        if (contentType) {
            var splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    };
    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    };
    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
        }
        ;
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
            if (progressSubscriber) {
                var xhrProgress_1;
                xhrProgress_1 = function (e) {
                    var progressSubscriber = xhrProgress_1.progressSubscriber;
                    progressSubscriber.next(e);
                };
                if (root_1.root.XDomainRequest) {
                    xhr.onprogress = xhrProgress_1;
                }
                else {
                    xhr.upload.onprogress = xhrProgress_1;
                }
                xhrProgress_1.progressSubscriber = progressSubscriber;
            }
            var xhrError_1;
            xhrError_1 = function (e) {
                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxError('ajax error', this, request));
            };
            xhr.onerror = xhrError_1;
            xhrError_1.request = request;
            xhrError_1.subscriber = this;
            xhrError_1.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (this.readyState === 4) {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status_1 = this.status === 1223 ? 204 : this.status;
                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status_1 === 0) {
                    status_1 = response ? 200 : 0;
                }
                if (200 <= status_1 && status_1 < 300) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
                }
            }
        }
        ;
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function () {
        var _a = this, done = _a.done, xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
}(Subscriber_1.Subscriber));
exports.AjaxSubscriber = AjaxSubscriber;
/**
 * A normalized AJAX response.
 *
 * @see {@link ajax}
 *
 * @class AjaxResponse
 */
var AjaxResponse = (function () {
    function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        this.response = parseXhrResponse(this.responseType, xhr);
    }
    return AjaxResponse;
}());
exports.AjaxResponse = AjaxResponse;
/**
 * A normalized AJAX error.
 *
 * @see {@link ajax}
 *
 * @class AjaxError
 */
var AjaxError = (function (_super) {
    __extends(AjaxError, _super);
    function AjaxError(message, xhr, request) {
        _super.call(this, message);
        this.message = message;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        this.response = parseXhrResponse(this.responseType, xhr);
    }
    return AjaxError;
}(Error));
exports.AjaxError = AjaxError;
function parseXhrResponse(responseType, xhr) {
    switch (responseType) {
        case 'json':
            if ('response' in xhr) {
                //IE does not support json as responseType, parse it internally
                return xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
            }
            else {
                return JSON.parse(xhr.responseText || 'null');
            }
        case 'xml':
            return xhr.responseXML;
        case 'text':
        default:
            return ('response' in xhr) ? xhr.response : xhr.responseText;
    }
}
/**
 * @see {@link ajax}
 *
 * @class AjaxTimeoutError
 */
var AjaxTimeoutError = (function (_super) {
    __extends(AjaxTimeoutError, _super);
    function AjaxTimeoutError(xhr, request) {
        _super.call(this, 'ajax timeout', xhr, request);
    }
    return AjaxTimeoutError;
}(AjaxError));
exports.AjaxTimeoutError = AjaxTimeoutError;
//# sourceMappingURL=AjaxObservable.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(1);
var rxSubscriber_1 = __webpack_require__(4);
var Observer_1 = __webpack_require__(8);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(0);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var noop_1 = __webpack_require__(21);
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tile = /** @class */ (function () {
    function Tile(id, width, height, indexOfArrayX, indexOfArrayY, imagePositionX, imagePositionY) {
        this.otherLayers = [];
        this.requestStatus = 0; // 0 - not requested, 1 - requesting, 2 - requested
        this.id = id;
        this._x = indexOfArrayX;
        this._y = indexOfArrayY;
        this._width = width;
        this._height = height;
        this._imagePositionX = imagePositionX;
        this._imagePositionY = imagePositionY;
    }
    Object.defineProperty(Tile.prototype, "ID", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "imageX", {
        get: function () {
            return this._imagePositionX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "imageY", {
        get: function () {
            return this._imagePositionY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "Status", {
        get: function () {
            return this.requestStatus;
        },
        enumerable: true,
        configurable: true
    });
    Tile.prototype.setRequestingStatus = function () {
        this.requestStatus = 1;
    };
    Tile.prototype.setRequestedStatus = function () {
        this.requestStatus = 2;
    };
    Tile.prototype.addImage = function (image) {
        this.otherLayers.push(image);
    };
    Tile.prototype.getImages = function () {
        return this.otherLayers.length ? this.otherLayers : null;
    };
    return Tile;
}());
exports.Tile = Tile;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ImageLoader = /** @class */ (function () {
    function ImageLoader(source, callback) {
        this.state = 0;
        this._width = 0;
        this._height = 0;
        this.node = document.createElement('div');
        this.callback = callback;
        this._image = document.createElement('img');
        this._image.setAttribute('src', source);
    }
    ImageLoader.prototype.load = function () {
        var _this = this;
        if (!this.state) {
            this.state = 1;
            [
                ['top', '-10000px'],
                ['left', '-10000px'],
                ['width', '1px'],
                ['height', '1px'],
                ['position', 'absolute'],
                ['overflow', 'hidden']
            ].forEach(function (v) {
                _this.node.style[v[0]] = v[1];
            });
            this.node.appendChild(this._image);
            this._image.addEventListener('load', function (e) {
                _this.state = 2;
                _this._width = _this.image.offsetWidth;
                _this._height = _this.image.offsetHeight;
                _this.callback(null, e);
            });
            this._image.addEventListener('error', function (e) {
                _this.state = 3;
                _this.callback(e);
            });
            document.body.appendChild(this.node);
        }
    };
    Object.defineProperty(ImageLoader.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "image", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    return ImageLoader;
}());
exports.ImageLoader = ImageLoader;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(9);
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var Camera = /** @class */ (function () {
    function Camera(cameraWidth, cameraHeight, mapWidth, mapHeight, tileWidth, tileHeight) {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.timer = null;
        this.isMoving = false;
        this.draw = new Subject_1.Subject();
        this.animationEnd = new Subject_1.Subject();
        this.step = 0.4;
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
    Camera.prototype.getIndex = function (value, size) {
        return Math.floor(Math.abs(value) / size);
    };
    Camera.prototype.getTiles = function () {
        var arr = [];
        var tw = this.tileWidth;
        var th = this.tileHeight;
        var indexX = this.getIndex(this.dx * (-1), tw);
        var indexY = this.getIndex(this.dy * (-1), th);
        var startX = indexX * tw;
        var startY = indexY * th;
        var normalizedX = Math.abs(this.dx);
        var normalizedY = Math.abs(this.dy);
        for (var _y = startY; _y < normalizedY + this.cameraHeight; _y += th) {
            for (var _x = startX; _x < normalizedX + this.cameraWidth; _x += tw) {
                arr.push(new Point(this.getIndex(_x, tw), this.getIndex(_y, th)));
            }
        }
        return arr;
    };
    Object.defineProperty(Camera.prototype, "X", {
        get: function () { return this.dx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "Y", {
        get: function () { return this.dy; },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.resize = function (width, height) {
        this.cameraWidth = width;
        this.cameraHeight = height;
        this.x = this.correctPosition(this.x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(this.y, this.cameraHeight - this.mapHeight);
    };
    Camera.prototype.correctMinPosition = function (value) {
        if (value > 0) {
            value = 0;
        }
        return value;
    };
    Camera.prototype.correctPosition = function (value, maxValue) {
        value = Math.floor(value);
        value = this.correctMinPosition(value);
        if (value < maxValue) {
            value = maxValue;
        }
        return value;
    };
    Camera.prototype.animation = function () {
        var _this = this;
        this.isMoving = true;
        var dx = (this.x - this.dx) * this.step;
        var dy = (this.y - this.dy) * this.step;
        dx = Math.floor(dx);
        dy = Math.floor(dy);
        this.dx += dx;
        this.dy += dy;
        this.draw.next();
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
            this.stop();
            this.animationEnd.next();
            return;
        }
        this.timer = setTimeout(function () { _this.animation(); }, 30);
    };
    Object.defineProperty(Camera.prototype, "drawEvent", {
        get: function () {
            return this.draw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "animationEndEvent", {
        get: function () {
            return this.animationEnd;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.stop = function () {
        clearTimeout(this.timer);
        this.dx = this.x;
        this.dy = this.y;
        this.isMoving = false;
    };
    Camera.prototype.setPosition = function (x, y) {
        this.x = this.correctPosition(this.x + x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(this.y + y, this.cameraHeight - this.mapHeight);
        if (!this.isMoving) {
            this.animation();
        }
    };
    Camera.prototype.move = function (indexX, indexY) {
        this.setStartPosition(indexX, indexY, true);
        if (!this.isMoving) {
            this.animation();
        }
    };
    Camera.prototype.setStartPosition = function (indexX, indexY, animation) {
        if (animation === void 0) { animation = false; }
        var x = (0 - indexX * this.tileWidth) + this.cameraWidth / 2 - this.tileWidth / 2;
        var y = (0 - indexY * this.tileHeight) + this.cameraHeight / 2 - this.tileHeight / 2;
        this.x = this.correctPosition(x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(y, this.cameraHeight - this.mapHeight);
        if (!animation) {
            this.dx = this.x;
            this.dy = this.y;
        }
    };
    Camera.prototype.getIndexOfTile = function (x, y) {
        return new Point(this.getIndex(this.x * (-1) + x, this.tileWidth), this.getIndex(this.y * (-1) + y, this.tileHeight));
    };
    return Camera;
}());
exports.Camera = Camera;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTkxOGMxMjMyZWVlYThlMDgyYTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9lcnJvck9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvc3ltYm9sL3J4U3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3RyeUNhdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL1N1YmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGVtYXAudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvb2JzZXJ2YWJsZS9kb20vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9vYnNlcnZhYmxlL2RvbS9BamF4T2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3BpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9ub29wLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9ycy9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0U3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy90aWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbWVyYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTkxOGMxMjMyZWVlYThlMDgyYTAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvbW1vbkpTIC8gTm9kZSBoYXZlIGdsb2JhbCBjb250ZXh0IGV4cG9zZWQgYXMgXCJnbG9iYWxcIiB2YXJpYWJsZS5cbi8vIFdlIGRvbid0IHdhbnQgdG8gaW5jbHVkZSB0aGUgd2hvbGUgbm9kZS5kLnRzIHRoaXMgdGhpcyBjb21waWxhdGlvbiB1bml0IHNvIHdlJ2xsIGp1c3QgZmFrZVxuLy8gdGhlIGdsb2JhbCBcImdsb2JhbFwiIHZhciBmb3Igbm93LlxudmFyIF9fd2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93O1xudmFyIF9fc2VsZiA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmIHNlbGY7XG52YXIgX19nbG9iYWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWw7XG52YXIgX3Jvb3QgPSBfX3dpbmRvdyB8fCBfX2dsb2JhbCB8fCBfX3NlbGY7XG5leHBvcnRzLnJvb3QgPSBfcm9vdDtcbi8vIFdvcmthcm91bmQgQ2xvc3VyZSBDb21waWxlciByZXN0cmljdGlvbjogVGhlIGJvZHkgb2YgYSBnb29nLm1vZHVsZSBjYW5ub3QgdXNlIHRocm93LlxuLy8gVGhpcyBpcyBuZWVkZWQgd2hlbiB1c2VkIHdpdGggYW5ndWxhci90c2lja2xlIHdoaWNoIGluc2VydHMgYSBnb29nLm1vZHVsZSBzdGF0ZW1lbnQuXG4vLyBXcmFwIGluIElJRkVcbihmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFfcm9vdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1J4SlMgY291bGQgbm90IGZpbmQgYW55IGdsb2JhbCBjb250ZXh0ICh3aW5kb3csIHNlbGYsIGdsb2JhbCknKTtcbiAgICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm9vdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0Z1bmN0aW9uJyk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuL09ic2VydmVyJyk7XG52YXIgcnhTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UgYW5kIGV4dGVuZHMgdGhlXG4gKiB7QGxpbmsgU3Vic2NyaXB0aW9ufSBjbGFzcy4gV2hpbGUgdGhlIHtAbGluayBPYnNlcnZlcn0gaXMgdGhlIHB1YmxpYyBBUEkgZm9yXG4gKiBjb25zdW1pbmcgdGhlIHZhbHVlcyBvZiBhbiB7QGxpbmsgT2JzZXJ2YWJsZX0sIGFsbCBPYnNlcnZlcnMgZ2V0IGNvbnZlcnRlZCB0b1xuICogYSBTdWJzY3JpYmVyLCBpbiBvcmRlciB0byBwcm92aWRlIFN1YnNjcmlwdGlvbi1saWtlIGNhcGFiaWxpdGllcyBzdWNoIGFzXG4gKiBgdW5zdWJzY3JpYmVgLiBTdWJzY3JpYmVyIGlzIGEgY29tbW9uIHR5cGUgaW4gUnhKUywgYW5kIGNydWNpYWwgZm9yXG4gKiBpbXBsZW1lbnRpbmcgb3BlcmF0b3JzLCBidXQgaXQgaXMgcmFyZWx5IHVzZWQgYXMgYSBwdWJsaWMgQVBJLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpYmVyPFQ+XG4gKi9cbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9uKHZhbHVlOiBUKTogdm9pZH0gW2Rlc3RpbmF0aW9uT3JOZXh0XSBBIHBhcnRpYWxseVxuICAgICAqIGRlZmluZWQgT2JzZXJ2ZXIgb3IgYSBgbmV4dGAgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IE9ic2VydmVyXzEuZW1wdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Pck5leHQgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25Pck5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmFkZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGVbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgLyoqXG4gICAgICogQSBzdGF0aWMgZmFjdG9yeSBmb3IgYSBTdWJzY3JpYmVyLCBnaXZlbiBhIChwb3RlbnRpYWxseSBwYXJ0aWFsKSBkZWZpbml0aW9uXG4gICAgICogb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbih4OiA/VCk6IHZvaWR9IFtuZXh0XSBUaGUgYG5leHRgIGNhbGxiYWNrIG9mIGFuIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gVGhlIGBjb21wbGV0ZWAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcmV0dXJuIHtTdWJzY3JpYmVyPFQ+fSBBIFN1YnNjcmliZXIgd3JhcHBpbmcgdGhlIChwYXJ0aWFsbHkgZGVmaW5lZClcbiAgICAgKiBPYnNlcnZlciByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICAgICAqL1xuICAgIFN1YnNjcmliZXIuY3JlYXRlID0gZnVuY3Rpb24gKG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKG5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYG5leHRgIGZyb21cbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhIHZhbHVlLiBUaGUgT2JzZXJ2YWJsZSBtYXkgY2FsbCB0aGlzIG1ldGhvZCAwIG9yIG1vcmVcbiAgICAgKiB0aW1lcy5cbiAgICAgKiBAcGFyYW0ge1R9IFt2YWx1ZV0gVGhlIGBuZXh0YCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgbm90aWZpY2F0aW9ucyBvZiB0eXBlIGBlcnJvcmAgZnJvbVxuICAgICAqIHRoZSBPYnNlcnZhYmxlLCB3aXRoIGFuIGF0dGFjaGVkIHtAbGluayBFcnJvcn0uIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0XG4gICAgICogdGhlIE9ic2VydmFibGUgaGFzIGV4cGVyaWVuY2VkIGFuIGVycm9yIGNvbmRpdGlvbi5cbiAgICAgKiBAcGFyYW0ge2FueX0gW2Vycl0gVGhlIGBlcnJvcmAgZXhjZXB0aW9uLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgYSB2YWx1ZWxlc3Mgbm90aWZpY2F0aW9uIG9mIHR5cGVcbiAgICAgKiBgY29tcGxldGVgIGZyb20gdGhlIE9ic2VydmFibGUuIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0IHRoZSBPYnNlcnZhYmxlXG4gICAgICogaGFzIGZpbmlzaGVkIHNlbmRpbmcgcHVzaC1iYXNlZCBub3RpZmljYXRpb25zLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZUFuZFJlY3ljbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gX3BhcmVudHM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJzY3JpYmVyID0gU3Vic2NyaWJlcjtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgU2FmZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTYWZlU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYWZlU3Vic2NyaWJlcihfcGFyZW50U3Vic2NyaWJlciwgb2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaWJlciA9IF9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICB2YXIgbmV4dDtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpKSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JzZXJ2ZXJPck5leHQpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dC5uZXh0O1xuICAgICAgICAgICAgZXJyb3IgPSBvYnNlcnZlck9yTmV4dC5lcnJvcjtcbiAgICAgICAgICAgIGNvbXBsZXRlID0gb2JzZXJ2ZXJPck5leHQuY29tcGxldGU7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJPck5leHQgIT09IE9ic2VydmVyXzEuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZShvYnNlcnZlck9yTmV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGNvbnRleHQudW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKGNvbnRleHQudW5zdWJzY3JpYmUuYmluZChjb250ZXh0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQudW5zdWJzY3JpYmUgPSB0aGlzLnVuc3Vic2NyaWJlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuX25leHQgPSBuZXh0O1xuICAgICAgICB0aGlzLl9lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLl9jb21wbGV0ZSA9IGNvbXBsZXRlO1xuICAgIH1cbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkICYmIHRoaXMuX25leHQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX25leHQsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB0aGlzLl9uZXh0LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lcnJvcikge1xuICAgICAgICAgICAgICAgIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZENvbXBsZXRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2NvbXBsZXRlLmNhbGwoX3RoaXMuX2NvbnRleHQpOyB9O1xuICAgICAgICAgICAgICAgIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB3cmFwcGVkQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX190cnlPclVuc3ViID0gZnVuY3Rpb24gKGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX190cnlPclNldEVycm9yID0gZnVuY3Rpb24gKHBhcmVudCwgZm4sIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgX3BhcmVudFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL1N1YnNjcmliZXIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyB0eXBlb2YgYW55IHNvIHRoYXQgaXQgd2UgZG9uJ3QgaGF2ZSB0byBjYXN0IHdoZW4gY29tcGFyaW5nIGEgcmVzdWx0IHRvIHRoZSBlcnJvciBvYmplY3RcbmV4cG9ydHMuZXJyb3JPYmplY3QgPSB7IGU6IHt9IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvck9iamVjdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvZXJyb3JPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaXNBcnJheV8xID0gcmVxdWlyZSgnLi91dGlsL2lzQXJyYXknKTtcbnZhciBpc09iamVjdF8xID0gcmVxdWlyZSgnLi91dGlsL2lzT2JqZWN0Jyk7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZSgnLi91dGlsL2lzRnVuY3Rpb24nKTtcbnZhciB0cnlDYXRjaF8xID0gcmVxdWlyZSgnLi91dGlsL3RyeUNhdGNoJyk7XG52YXIgZXJyb3JPYmplY3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9lcnJvck9iamVjdCcpO1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3JfMSA9IHJlcXVpcmUoJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJyk7XG4vKipcbiAqIFJlcHJlc2VudHMgYSBkaXNwb3NhYmxlIHJlc291cmNlLCBzdWNoIGFzIHRoZSBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZS4gQVxuICogU3Vic2NyaXB0aW9uIGhhcyBvbmUgaW1wb3J0YW50IG1ldGhvZCwgYHVuc3Vic2NyaWJlYCwgdGhhdCB0YWtlcyBubyBhcmd1bWVudFxuICogYW5kIGp1c3QgZGlzcG9zZXMgdGhlIHJlc291cmNlIGhlbGQgYnkgdGhlIHN1YnNjcmlwdGlvbi5cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHN1YnNjcmlwdGlvbnMgbWF5IGJlIGdyb3VwZWQgdG9nZXRoZXIgdGhyb3VnaCB0aGUgYGFkZCgpYFxuICogbWV0aG9kLCB3aGljaCB3aWxsIGF0dGFjaCBhIGNoaWxkIFN1YnNjcmlwdGlvbiB0byB0aGUgY3VycmVudCBTdWJzY3JpcHRpb24uXG4gKiBXaGVuIGEgU3Vic2NyaXB0aW9uIGlzIHVuc3Vic2NyaWJlZCwgYWxsIGl0cyBjaGlsZHJlbiAoYW5kIGl0cyBncmFuZGNoaWxkcmVuKVxuICogd2lsbCBiZSB1bnN1YnNjcmliZWQgYXMgd2VsbC5cbiAqXG4gKiBAY2xhc3MgU3Vic2NyaXB0aW9uXG4gKi9cbnZhciBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW3Vuc3Vic2NyaWJlXSBBIGZ1bmN0aW9uIGRlc2NyaWJpbmcgaG93IHRvXG4gICAgICogcGVyZm9ybSB0aGUgZGlzcG9zYWwgb2YgcmVzb3VyY2VzIHdoZW4gdGhlIGB1bnN1YnNjcmliZWAgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24odW5zdWJzY3JpYmUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoaXMgU3Vic2NyaXB0aW9uIGhhcyBhbHJlYWR5IGJlZW4gdW5zdWJzY3JpYmVkLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl91bnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VzIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLiBNYXksIGZvciBpbnN0YW5jZSwgY2FuY2VsXG4gICAgICogYW4gb25nb2luZyBPYnNlcnZhYmxlIGV4ZWN1dGlvbiBvciBjYW5jZWwgYW55IG90aGVyIHR5cGUgb2Ygd29yayB0aGF0XG4gICAgICogc3RhcnRlZCB3aGVuIHRoZSBTdWJzY3JpcHRpb24gd2FzIGNyZWF0ZWQuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzLCBfdW5zdWJzY3JpYmUgPSBfYS5fdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zID0gX2EuX3N1YnNjcmlwdGlvbnM7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIC8vIG51bGwgb3V0IF9zdWJzY3JpcHRpb25zIGZpcnN0IHNvIGFueSBjaGlsZCBzdWJzY3JpcHRpb25zIHRoYXQgYXR0ZW1wdFxuICAgICAgICAvLyB0byByZW1vdmUgdGhlbXNlbHZlcyBmcm9tIHRoaXMgc3Vic2NyaXB0aW9uIHdpbGwgbm9vcFxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIHZhciBsZW4gPSBfcGFyZW50cyA/IF9wYXJlbnRzLmxlbmd0aCA6IDA7XG4gICAgICAgIC8vIGlmIHRoaXMuX3BhcmVudCBpcyBudWxsLCB0aGVuIHNvIGlzIHRoaXMuX3BhcmVudHMsIGFuZCB3ZVxuICAgICAgICAvLyBkb24ndCBoYXZlIHRvIHJlbW92ZSBvdXJzZWx2ZXMgZnJvbSBhbnkgcGFyZW50IHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHdoaWxlIChfcGFyZW50KSB7XG4gICAgICAgICAgICBfcGFyZW50LnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMuX3BhcmVudHMgaXMgbnVsbCBvciBpbmRleCA+PSBsZW4sXG4gICAgICAgICAgICAvLyB0aGVuIF9wYXJlbnQgaXMgc2V0IHRvIG51bGwsIGFuZCB0aGUgbG9vcCBleGl0c1xuICAgICAgICAgICAgX3BhcmVudCA9ICsraW5kZXggPCBsZW4gJiYgX3BhcmVudHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIHZhciB0cmlhbCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goX3Vuc3Vic2NyaWJlKS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yID9cbiAgICAgICAgICAgICAgICAgICAgZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZS5lcnJvcnMpIDogW2Vycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5XzEuaXNBcnJheShfc3Vic2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICAgICAgICAgIHZhciBzdWIgPSBfc3Vic2NyaXB0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0XzEuaXNPYmplY3Qoc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJpYWwgPSB0cnlDYXRjaF8xLnRyeUNhdGNoKHN1Yi51bnN1YnNjcmliZSkuY2FsbChzdWIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdChmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRXJyb3JzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHRlYXIgZG93biB0byBiZSBjYWxsZWQgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSgpIG9mIHRoaXNcbiAgICAgKiBTdWJzY3JpcHRpb24uXG4gICAgICpcbiAgICAgKiBJZiB0aGUgdGVhciBkb3duIGJlaW5nIGFkZGVkIGlzIGEgc3Vic2NyaXB0aW9uIHRoYXQgaXMgYWxyZWFkeVxuICAgICAqIHVuc3Vic2NyaWJlZCwgaXMgdGhlIHNhbWUgcmVmZXJlbmNlIGBhZGRgIGlzIGJlaW5nIGNhbGxlZCBvbiwgb3IgaXNcbiAgICAgKiBgU3Vic2NyaXB0aW9uLkVNUFRZYCwgaXQgd2lsbCBub3QgYmUgYWRkZWQuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHN1YnNjcmlwdGlvbiBpcyBhbHJlYWR5IGluIGFuIGBjbG9zZWRgIHN0YXRlLCB0aGUgcGFzc2VkXG4gICAgICogdGVhciBkb3duIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RlYXJkb3duTG9naWN9IHRlYXJkb3duIFRoZSBhZGRpdGlvbmFsIGxvZ2ljIHRvIGV4ZWN1dGUgb25cbiAgICAgKiB0ZWFyZG93bi5cbiAgICAgKiBAcmV0dXJuIHtTdWJzY3JpcHRpb259IFJldHVybnMgdGhlIFN1YnNjcmlwdGlvbiB1c2VkIG9yIGNyZWF0ZWQgdG8gYmVcbiAgICAgKiBhZGRlZCB0byB0aGUgaW5uZXIgc3Vic2NyaXB0aW9ucyBsaXN0LiBUaGlzIFN1YnNjcmlwdGlvbiBjYW4gYmUgdXNlZCB3aXRoXG4gICAgICogYHJlbW92ZSgpYCB0byByZW1vdmUgdGhlIHBhc3NlZCB0ZWFyZG93biBsb2dpYyBmcm9tIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zXG4gICAgICogbGlzdC5cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICBpZiAoIXRlYXJkb3duIHx8ICh0ZWFyZG93biA9PT0gU3Vic2NyaXB0aW9uLkVNUFRZKSkge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVhcmRvd24gPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0ZWFyZG93bjtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdGVhcmRvd24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRlYXJkb3duKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbi5jbG9zZWQgfHwgdHlwZW9mIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHN1YnNjcmlwdGlvbi5fYWRkUGFyZW50ICE9PSAnZnVuY3Rpb24nIC8qIHF1YWNrIHF1YWNrICovKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLl9zdWJzY3JpcHRpb25zID0gW3RtcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0ZWFyZG93biAnICsgdGVhcmRvd24gKyAnIGFkZGVkIHRvIFN1YnNjcmlwdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmlwdGlvbnMgfHwgKHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXSk7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICBzdWJzY3JpcHRpb24uX2FkZFBhcmVudCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBTdWJzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWwgbGlzdCBvZiBzdWJzY3JpcHRpb25zIHRoYXQgd2lsbFxuICAgICAqIHVuc3Vic2NyaWJlIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUgcHJvY2VzcyBvZiB0aGlzIFN1YnNjcmlwdGlvbi5cbiAgICAgKiBAcGFyYW0ge1N1YnNjcmlwdGlvbn0gc3Vic2NyaXB0aW9uIFRoZSBzdWJzY3JpcHRpb24gdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb25JbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbkluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fYWRkUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cztcbiAgICAgICAgaWYgKCFfcGFyZW50IHx8IF9wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHBhcmVudCwgb3IgdGhlIG5ldyBwYXJlbnQgaXMgdGhlIHNhbWUgYXMgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IHBhcmVudCwgdGhlbiBzZXQgdGhpcy5fcGFyZW50IHRvIHRoZSBuZXcgcGFyZW50LlxuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFfcGFyZW50cykge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhbHJlYWR5IG9uZSBwYXJlbnQsIGJ1dCBub3QgbXVsdGlwbGUsIGFsbG9jYXRlIGFuIEFycmF5IHRvXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzdCBvZiB0aGUgcGFyZW50IFN1YnNjcmlwdGlvbnMuXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRzID0gW3BhcmVudF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX3BhcmVudHMuaW5kZXhPZihwYXJlbnQpID09PSAtMSkge1xuICAgICAgICAgICAgLy8gT25seSBhZGQgdGhlIG5ldyBwYXJlbnQgdG8gdGhlIF9wYXJlbnRzIGxpc3QgaWYgaXQncyBub3QgYWxyZWFkeSB0aGVyZS5cbiAgICAgICAgICAgIF9wYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uIChlbXB0eSkge1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfShuZXcgU3Vic2NyaXB0aW9uKCkpKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydHMuU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uO1xuZnVuY3Rpb24gZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVycm9ycykge1xuICAgIHJldHVybiBlcnJvcnMucmVkdWNlKGZ1bmN0aW9uIChlcnJzLCBlcnIpIHsgcmV0dXJuIGVycnMuY29uY2F0KChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikgPyBlcnIuZXJyb3JzIDogZXJyKTsgfSwgW10pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvcm9vdCcpO1xudmFyIFN5bWJvbCA9IHJvb3RfMS5yb290LlN5bWJvbDtcbmV4cG9ydHMucnhTdWJzY3JpYmVyID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5mb3IgPT09ICdmdW5jdGlvbicpID9cbiAgICBTeW1ib2wuZm9yKCdyeFN1YnNjcmliZXInKSA6ICdAQHJ4U3Vic2NyaWJlcic7XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSByeFN1YnNjcmliZXIgaW5zdGVhZFxuICovXG5leHBvcnRzLiQkcnhTdWJzY3JpYmVyID0gZXhwb3J0cy5yeFN1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yeFN1YnNjcmliZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGVycm9yT2JqZWN0XzEgPSByZXF1aXJlKCcuL2Vycm9yT2JqZWN0Jyk7XG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XG5mdW5jdGlvbiB0cnlDYXRjaGVyKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0cnlDYXRjaFRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdDtcbiAgICB9XG59XG5mdW5jdGlvbiB0cnlDYXRjaChmbikge1xuICAgIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XG59XG5leHBvcnRzLnRyeUNhdGNoID0gdHJ5Q2F0Y2g7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cnlDYXRjaC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdHJ5Q2F0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi91dGlsL3Jvb3QnKTtcbnZhciB0b1N1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vdXRpbC90b1N1YnNjcmliZXInKTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9vYnNlcnZhYmxlJyk7XG52YXIgcGlwZV8xID0gcmVxdWlyZSgnLi91dGlsL3BpcGUnKTtcbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBhbnkgc2V0IG9mIHZhbHVlcyBvdmVyIGFueSBhbW91bnQgb2YgdGltZS4gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBidWlsZGluZyBibG9ja1xuICogb2YgUnhKUy5cbiAqXG4gKiBAY2xhc3MgT2JzZXJ2YWJsZTxUPlxuICovXG52YXIgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlIHRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBPYnNlcnZhYmxlIGlzXG4gICAgICogaW5pdGlhbGx5IHN1YnNjcmliZWQgdG8uIFRoaXMgZnVuY3Rpb24gaXMgZ2l2ZW4gYSBTdWJzY3JpYmVyLCB0byB3aGljaCBuZXcgdmFsdWVzXG4gICAgICogY2FuIGJlIGBuZXh0YGVkLCBvciBhbiBgZXJyb3JgIG1ldGhvZCBjYW4gYmUgY2FsbGVkIHRvIHJhaXNlIGFuIGVycm9yLCBvclxuICAgICAqIGBjb21wbGV0ZWAgY2FuIGJlIGNhbGxlZCB0byBub3RpZnkgb2YgYSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmUpIHtcbiAgICAgICAgdGhpcy5faXNTY2FsYXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgT2JzZXJ2YWJsZSwgd2l0aCB0aGlzIE9ic2VydmFibGUgYXMgdGhlIHNvdXJjZSwgYW5kIHRoZSBwYXNzZWRcbiAgICAgKiBvcGVyYXRvciBkZWZpbmVkIGFzIHRoZSBuZXcgb2JzZXJ2YWJsZSdzIG9wZXJhdG9yLlxuICAgICAqIEBtZXRob2QgbGlmdFxuICAgICAqIEBwYXJhbSB7T3BlcmF0b3J9IG9wZXJhdG9yIHRoZSBvcGVyYXRvciBkZWZpbmluZyB0aGUgb3BlcmF0aW9uIHRvIHRha2Ugb24gdGhlIG9ic2VydmFibGVcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhIG5ldyBvYnNlcnZhYmxlIHdpdGggdGhlIE9wZXJhdG9yIGFwcGxpZWRcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW52b2tlcyBhbiBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZSBhbmQgcmVnaXN0ZXJzIE9ic2VydmVyIGhhbmRsZXJzIGZvciBub3RpZmljYXRpb25zIGl0IHdpbGwgZW1pdC5cbiAgICAgKlxuICAgICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Vc2UgaXQgd2hlbiB5b3UgaGF2ZSBhbGwgdGhlc2UgT2JzZXJ2YWJsZXMsIGJ1dCBzdGlsbCBub3RoaW5nIGlzIGhhcHBlbmluZy48L3NwYW4+XG4gICAgICpcbiAgICAgKiBgc3Vic2NyaWJlYCBpcyBub3QgYSByZWd1bGFyIG9wZXJhdG9yLCBidXQgYSBtZXRob2QgdGhhdCBjYWxscyBPYnNlcnZhYmxlJ3MgaW50ZXJuYWwgYHN1YnNjcmliZWAgZnVuY3Rpb24uIEl0XG4gICAgICogbWlnaHQgYmUgZm9yIGV4YW1wbGUgYSBmdW5jdGlvbiB0aGF0IHlvdSBwYXNzZWQgdG8gYSB7QGxpbmsgY3JlYXRlfSBzdGF0aWMgZmFjdG9yeSwgYnV0IG1vc3Qgb2YgdGhlIHRpbWUgaXQgaXNcbiAgICAgKiBhIGxpYnJhcnkgaW1wbGVtZW50YXRpb24sIHdoaWNoIGRlZmluZXMgd2hhdCBhbmQgd2hlbiB3aWxsIGJlIGVtaXR0ZWQgYnkgYW4gT2JzZXJ2YWJsZS4gVGhpcyBtZWFucyB0aGF0IGNhbGxpbmdcbiAgICAgKiBgc3Vic2NyaWJlYCBpcyBhY3R1YWxseSB0aGUgbW9tZW50IHdoZW4gT2JzZXJ2YWJsZSBzdGFydHMgaXRzIHdvcmssIG5vdCB3aGVuIGl0IGlzIGNyZWF0ZWQsIGFzIGl0IGlzIG9mdGVuXG4gICAgICogdGhvdWdodC5cbiAgICAgKlxuICAgICAqIEFwYXJ0IGZyb20gc3RhcnRpbmcgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLCB0aGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGxpc3RlbiBmb3IgdmFsdWVzXG4gICAgICogdGhhdCBhbiBPYnNlcnZhYmxlIGVtaXRzLCBhcyB3ZWxsIGFzIGZvciB3aGVuIGl0IGNvbXBsZXRlcyBvciBlcnJvcnMuIFlvdSBjYW4gYWNoaWV2ZSB0aGlzIGluIHR3b1xuICAgICAqIGZvbGxvd2luZyB3YXlzLlxuICAgICAqXG4gICAgICogVGhlIGZpcnN0IHdheSBpcyBjcmVhdGluZyBhbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIHtAbGluayBPYnNlcnZlcn0gaW50ZXJmYWNlLiBJdCBzaG91bGQgaGF2ZSBtZXRob2RzXG4gICAgICogZGVmaW5lZCBieSB0aGF0IGludGVyZmFjZSwgYnV0IG5vdGUgdGhhdCBpdCBzaG91bGQgYmUganVzdCBhIHJlZ3VsYXIgSmF2YVNjcmlwdCBvYmplY3QsIHdoaWNoIHlvdSBjYW4gY3JlYXRlXG4gICAgICogeW91cnNlbGYgaW4gYW55IHdheSB5b3Ugd2FudCAoRVM2IGNsYXNzLCBjbGFzc2ljIGZ1bmN0aW9uIGNvbnN0cnVjdG9yLCBvYmplY3QgbGl0ZXJhbCBldGMuKS4gSW4gcGFydGljdWxhciBkb1xuICAgICAqIG5vdCBhdHRlbXB0IHRvIHVzZSBhbnkgUnhKUyBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIHRvIGNyZWF0ZSBPYnNlcnZlcnMgLSB5b3UgZG9uJ3QgbmVlZCB0aGVtLiBSZW1lbWJlciBhbHNvXG4gICAgICogdGhhdCB5b3VyIG9iamVjdCBkb2VzIG5vdCBoYXZlIHRvIGltcGxlbWVudCBhbGwgbWV0aG9kcy4gSWYgeW91IGZpbmQgeW91cnNlbGYgY3JlYXRpbmcgYSBtZXRob2QgdGhhdCBkb2Vzbid0XG4gICAgICogZG8gYW55dGhpbmcsIHlvdSBjYW4gc2ltcGx5IG9taXQgaXQuIE5vdGUgaG93ZXZlciwgdGhhdCBpZiBgZXJyb3JgIG1ldGhvZCBpcyBub3QgcHJvdmlkZWQsIGFsbCBlcnJvcnMgd2lsbFxuICAgICAqIGJlIGxlZnQgdW5jYXVnaHQuXG4gICAgICpcbiAgICAgKiBUaGUgc2Vjb25kIHdheSBpcyB0byBnaXZlIHVwIG9uIE9ic2VydmVyIG9iamVjdCBhbHRvZ2V0aGVyIGFuZCBzaW1wbHkgcHJvdmlkZSBjYWxsYmFjayBmdW5jdGlvbnMgaW4gcGxhY2Ugb2YgaXRzIG1ldGhvZHMuXG4gICAgICogVGhpcyBtZWFucyB5b3UgY2FuIHByb3ZpZGUgdGhyZWUgZnVuY3Rpb25zIGFzIGFyZ3VtZW50cyB0byBgc3Vic2NyaWJlYCwgd2hlcmUgZmlyc3QgZnVuY3Rpb24gaXMgZXF1aXZhbGVudFxuICAgICAqIG9mIGEgYG5leHRgIG1ldGhvZCwgc2Vjb25kIG9mIGFuIGBlcnJvcmAgbWV0aG9kIGFuZCB0aGlyZCBvZiBhIGBjb21wbGV0ZWAgbWV0aG9kLiBKdXN0IGFzIGluIGNhc2Ugb2YgT2JzZXJ2ZXIsXG4gICAgICogaWYgeW91IGRvIG5vdCBuZWVkIHRvIGxpc3RlbiBmb3Igc29tZXRoaW5nLCB5b3UgY2FuIG9taXQgYSBmdW5jdGlvbiwgcHJlZmVyYWJseSBieSBwYXNzaW5nIGB1bmRlZmluZWRgIG9yIGBudWxsYCxcbiAgICAgKiBzaW5jZSBgc3Vic2NyaWJlYCByZWNvZ25pemVzIHRoZXNlIGZ1bmN0aW9ucyBieSB3aGVyZSB0aGV5IHdlcmUgcGxhY2VkIGluIGZ1bmN0aW9uIGNhbGwuIFdoZW4gaXQgY29tZXNcbiAgICAgKiB0byBgZXJyb3JgIGZ1bmN0aW9uLCBqdXN0IGFzIGJlZm9yZSwgaWYgbm90IHByb3ZpZGVkLCBlcnJvcnMgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlIHdpbGwgYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogV2hhdGV2ZXIgc3R5bGUgb2YgY2FsbGluZyBgc3Vic2NyaWJlYCB5b3UgdXNlLCBpbiBib3RoIGNhc2VzIGl0IHJldHVybnMgYSBTdWJzY3JpcHRpb24gb2JqZWN0LlxuICAgICAqIFRoaXMgb2JqZWN0IGFsbG93cyB5b3UgdG8gY2FsbCBgdW5zdWJzY3JpYmVgIG9uIGl0LCB3aGljaCBpbiB0dXJuIHdpbGwgc3RvcCB3b3JrIHRoYXQgYW4gT2JzZXJ2YWJsZSBkb2VzIGFuZCB3aWxsIGNsZWFuXG4gICAgICogdXAgYWxsIHJlc291cmNlcyB0aGF0IGFuIE9ic2VydmFibGUgdXNlZC4gTm90ZSB0aGF0IGNhbmNlbGxpbmcgYSBzdWJzY3JpcHRpb24gd2lsbCBub3QgY2FsbCBgY29tcGxldGVgIGNhbGxiYWNrXG4gICAgICogcHJvdmlkZWQgdG8gYHN1YnNjcmliZWAgZnVuY3Rpb24sIHdoaWNoIGlzIHJlc2VydmVkIGZvciBhIHJlZ3VsYXIgY29tcGxldGlvbiBzaWduYWwgdGhhdCBjb21lcyBmcm9tIGFuIE9ic2VydmFibGUuXG4gICAgICpcbiAgICAgKiBSZW1lbWJlciB0aGF0IGNhbGxiYWNrcyBwcm92aWRlZCB0byBgc3Vic2NyaWJlYCBhcmUgbm90IGd1YXJhbnRlZWQgdG8gYmUgY2FsbGVkIGFzeW5jaHJvbm91c2x5LlxuICAgICAqIEl0IGlzIGFuIE9ic2VydmFibGUgaXRzZWxmIHRoYXQgZGVjaWRlcyB3aGVuIHRoZXNlIGZ1bmN0aW9ucyB3aWxsIGJlIGNhbGxlZC4gRm9yIGV4YW1wbGUge0BsaW5rIG9mfVxuICAgICAqIGJ5IGRlZmF1bHQgZW1pdHMgYWxsIGl0cyB2YWx1ZXMgc3luY2hyb25vdXNseS4gQWx3YXlzIGNoZWNrIGRvY3VtZW50YXRpb24gZm9yIGhvdyBnaXZlbiBPYnNlcnZhYmxlXG4gICAgICogd2lsbCBiZWhhdmUgd2hlbiBzdWJzY3JpYmVkIGFuZCBpZiBpdHMgZGVmYXVsdCBiZWhhdmlvciBjYW4gYmUgbW9kaWZpZWQgd2l0aCBhIHtAbGluayBTY2hlZHVsZXJ9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U3Vic2NyaWJlIHdpdGggYW4gT2JzZXJ2ZXI8L2NhcHRpb24+XG4gICAgICogY29uc3Qgc3VtT2JzZXJ2ZXIgPSB7XG4gICAgICogICBzdW06IDAsXG4gICAgICogICBuZXh0KHZhbHVlKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBZGRpbmc6ICcgKyB2YWx1ZSk7XG4gICAgICogICAgIHRoaXMuc3VtID0gdGhpcy5zdW0gKyB2YWx1ZTtcbiAgICAgKiAgIH0sXG4gICAgICogICBlcnJvcigpIHsgLy8gV2UgYWN0dWFsbHkgY291bGQganVzdCByZW1vdmUgdGhpcyBtZXRob2QsXG4gICAgICogICB9LCAgICAgICAgLy8gc2luY2Ugd2UgZG8gbm90IHJlYWxseSBjYXJlIGFib3V0IGVycm9ycyByaWdodCBub3cuXG4gICAgICogICBjb21wbGV0ZSgpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1N1bSBlcXVhbHM6ICcgKyB0aGlzLnN1bSk7XG4gICAgICogICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIFJ4Lk9ic2VydmFibGUub2YoMSwgMiwgMykgLy8gU3luY2hyb25vdXNseSBlbWl0cyAxLCAyLCAzIGFuZCB0aGVuIGNvbXBsZXRlcy5cbiAgICAgKiAuc3Vic2NyaWJlKHN1bU9ic2VydmVyKTtcbiAgICAgKlxuICAgICAqIC8vIExvZ3M6XG4gICAgICogLy8gXCJBZGRpbmc6IDFcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAyXCJcbiAgICAgKiAvLyBcIkFkZGluZzogM1wiXG4gICAgICogLy8gXCJTdW0gZXF1YWxzOiA2XCJcbiAgICAgKlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U3Vic2NyaWJlIHdpdGggZnVuY3Rpb25zPC9jYXB0aW9uPlxuICAgICAqIGxldCBzdW0gPSAwO1xuICAgICAqXG4gICAgICogUnguT2JzZXJ2YWJsZS5vZigxLCAyLCAzKVxuICAgICAqIC5zdWJzY3JpYmUoXG4gICAgICogICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWRkaW5nOiAnICsgdmFsdWUpO1xuICAgICAqICAgICBzdW0gPSBzdW0gKyB2YWx1ZTtcbiAgICAgKiAgIH0sXG4gICAgICogICB1bmRlZmluZWQsXG4gICAgICogICBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1N1bSBlcXVhbHM6ICcgKyBzdW0pO1xuICAgICAqICAgfVxuICAgICAqICk7XG4gICAgICpcbiAgICAgKiAvLyBMb2dzOlxuICAgICAqIC8vIFwiQWRkaW5nOiAxXCJcbiAgICAgKiAvLyBcIkFkZGluZzogMlwiXG4gICAgICogLy8gXCJBZGRpbmc6IDNcIlxuICAgICAqIC8vIFwiU3VtIGVxdWFsczogNlwiXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPkNhbmNlbCBhIHN1YnNjcmlwdGlvbjwvY2FwdGlvbj5cbiAgICAgKiBjb25zdCBzdWJzY3JpcHRpb24gPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApLnN1YnNjcmliZShcbiAgICAgKiAgIG51bSA9PiBjb25zb2xlLmxvZyhudW0pLFxuICAgICAqICAgdW5kZWZpbmVkLFxuICAgICAqICAgKCkgPT4gY29uc29sZS5sb2coJ2NvbXBsZXRlZCEnKSAvLyBXaWxsIG5vdCBiZSBjYWxsZWQsIGV2ZW5cbiAgICAgKiApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBjYW5jZWxsaW5nIHN1YnNjcmlwdGlvblxuICAgICAqXG4gICAgICpcbiAgICAgKiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgKiAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAqICAgY29uc29sZS5sb2coJ3Vuc3Vic2NyaWJlZCEnKTtcbiAgICAgKiB9LCAyNTAwKTtcbiAgICAgKlxuICAgICAqIC8vIExvZ3M6XG4gICAgICogLy8gMCBhZnRlciAxc1xuICAgICAqIC8vIDEgYWZ0ZXIgMnNcbiAgICAgKiAvLyBcInVuc3Vic2NyaWJlZCFcIiBhZnRlciAyLjVzXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JzZXJ2ZXJ8RnVuY3Rpb259IG9ic2VydmVyT3JOZXh0IChvcHRpb25hbCkgRWl0aGVyIGFuIG9ic2VydmVyIHdpdGggbWV0aG9kcyB0byBiZSBjYWxsZWQsXG4gICAgICogIG9yIHRoZSBmaXJzdCBvZiB0aHJlZSBwb3NzaWJsZSBoYW5kbGVycywgd2hpY2ggaXMgdGhlIGhhbmRsZXIgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBmcm9tIHRoZSBzdWJzY3JpYmVkXG4gICAgICogIE9ic2VydmFibGUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3IgKG9wdGlvbmFsKSBBIGhhbmRsZXIgZm9yIGEgdGVybWluYWwgZXZlbnQgcmVzdWx0aW5nIGZyb20gYW4gZXJyb3IuIElmIG5vIGVycm9yIGhhbmRsZXIgaXMgcHJvdmlkZWQsXG4gICAgICogIHRoZSBlcnJvciB3aWxsIGJlIHRocm93biBhcyB1bmhhbmRsZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGUgKG9wdGlvbmFsKSBBIGhhbmRsZXIgZm9yIGEgdGVybWluYWwgZXZlbnQgcmVzdWx0aW5nIGZyb20gc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqIEByZXR1cm4ge0lTdWJzY3JpcHRpb259IGEgc3Vic2NyaXB0aW9uIHJlZmVyZW5jZSB0byB0aGUgcmVnaXN0ZXJlZCBoYW5kbGVyc1xuICAgICAqIEBtZXRob2Qgc3Vic2NyaWJlXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIG9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcbiAgICAgICAgdmFyIHNpbmsgPSB0b1N1YnNjcmliZXJfMS50b1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgb3BlcmF0b3IuY2FsbChzaW5rLCB0aGlzLnNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzaW5rLmFkZCh0aGlzLnNvdXJjZSA/IHRoaXMuX3N1YnNjcmliZShzaW5rKSA6IHRoaXMuX3RyeVN1YnNjcmliZShzaW5rKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgc2luay5zeW5jRXJyb3JWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2luaztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShzaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGZvckVhY2hcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0IGEgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHBhcmFtIHtQcm9taXNlQ29uc3RydWN0b3J9IFtQcm9taXNlQ3Rvcl0gYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB1c2VkIHRvIGluc3RhbnRpYXRlIHRoZSBQcm9taXNlXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgZWl0aGVyIHJlc29sdmVzIG9uIG9ic2VydmFibGUgY29tcGxldGlvbiBvclxuICAgICAqICByZWplY3RzIHdpdGggdGhlIGhhbmRsZWQgZXJyb3JcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIFByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIGlmIChyb290XzEucm9vdC5SeCAmJiByb290XzEucm9vdC5SeC5jb25maWcgJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gTXVzdCBiZSBkZWNsYXJlZCBpbiBhIHNlcGFyYXRlIHN0YXRlbWVudCB0byBhdm9pZCBhIFJlZmVybmNlRXJyb3Igd2hlblxuICAgICAgICAgICAgLy8gYWNjZXNzaW5nIHN1YnNjcmlwdGlvbiBiZWxvdyBpbiB0aGUgY2xvc3VyZSBkdWUgdG8gVGVtcG9yYWwgRGVhZCBab25lLlxuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc3Vic2NyaXB0aW9uLCB0aGVuIHdlIGNhbiBzdXJtaXNlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBuZXh0IGhhbmRsaW5nIGlzIGFzeW5jaHJvbm91cy4gQW55IGVycm9ycyB0aHJvd25cbiAgICAgICAgICAgICAgICAgICAgLy8gbmVlZCB0byBiZSByZWplY3RlZCBleHBsaWNpdGx5IGFuZCB1bnN1YnNjcmliZSBtdXN0IGJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBtYW51YWxseVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgTk8gc3Vic2NyaXB0aW9uLCB0aGVuIHdlJ3JlIGdldHRpbmcgYSBuZXh0ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFsdWUgc3luY2hyb25vdXNseSBkdXJpbmcgc3Vic2NyaXB0aW9uLiBXZSBjYW4ganVzdCBjYWxsIGl0LlxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCBlcnJvcnMsIE9ic2VydmFibGUncyBgc3Vic2NyaWJlYCB3aWxsIGVuc3VyZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5zdWJzY3JpcHRpb24gbG9naWMgaXMgY2FsbGVkLCB0aGVuIHN5bmNocm9ub3VzbHkgcmV0aHJvdyB0aGUgZXJyb3IuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHRoYXQsIFByb21pc2Ugd2lsbCB0cmFwIHRoZSBlcnJvciBhbmQgc2VuZCBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBkb3duIHRoZSByZWplY3Rpb24gcGF0aC5cbiAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVqZWN0LCByZXNvbHZlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFuIGludGVyb3AgcG9pbnQgZGVmaW5lZCBieSB0aGUgZXM3LW9ic2VydmFibGUgc3BlYyBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBTeW1ib2wub2JzZXJ2YWJsZVxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IHRoaXMgaW5zdGFuY2Ugb2YgdGhlIG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVtvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHN0aXRjaCB0b2dldGhlciBmdW5jdGlvbmFsIG9wZXJhdG9ycyBpbnRvIGEgY2hhaW4uXG4gICAgICogQG1ldGhvZCBwaXBlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhlIE9ic2VydmFibGUgcmVzdWx0IG9mIGFsbCBvZiB0aGUgb3BlcmF0b3JzIGhhdmluZ1xuICAgICAqIGJlZW4gY2FsbGVkIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuICAgICAqXG4gICAgICogUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKVxuICAgICAqICAgLnBpcGUoXG4gICAgICogICAgIGZpbHRlcih4ID0+IHggJSAyID09PSAwKSxcbiAgICAgKiAgICAgbWFwKHggPT4geCArIHgpLFxuICAgICAqICAgICBzY2FuKChhY2MsIHgpID0+IGFjYyArIHgpXG4gICAgICogICApXG4gICAgICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wZXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZV8xLnBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChQcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICBpZiAocm9vdF8xLnJvb3QuUnggJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvb3RfMS5yb290LlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBQcm9taXNlIGltcGwgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoeCkgeyByZXR1cm4gdmFsdWUgPSB4OyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByZWplY3QoZXJyKTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIEhBQ0s6IFNpbmNlIFR5cGVTY3JpcHQgaW5oZXJpdHMgc3RhdGljIHByb3BlcnRpZXMgdG9vLCB3ZSBoYXZlIHRvXG4gICAgLy8gZmlnaHQgYWdhaW5zdCBUeXBlU2NyaXB0IGhlcmUgc28gU3ViamVjdCBjYW4gaGF2ZSBhIGRpZmZlcmVudCBzdGF0aWMgY3JlYXRlIHNpZ25hdHVyZVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgY29sZCBPYnNlcnZhYmxlIGJ5IGNhbGxpbmcgdGhlIE9ic2VydmFibGUgY29uc3RydWN0b3JcbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlPyB0aGUgc3Vic2NyaWJlciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gdGhlIE9ic2VydmFibGUgY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhIG5ldyBjb2xkIG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnRzLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2YWJsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuZW1wdHkgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7IHRocm93IGVycjsgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkgeyB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2ZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy9PYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vT2JzZXJ2YWJsZScpO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vU3Vic2NyaWJlcicpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpcHRpb24nKTtcbnZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xID0gcmVxdWlyZSgnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJyk7XG52YXIgU3ViamVjdFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJqZWN0U3Vic2NyaXB0aW9uJyk7XG52YXIgcnhTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbi8qKlxuICogQGNsYXNzIFN1YmplY3RTdWJzY3JpYmVyPFQ+XG4gKi9cbnZhciBTdWJqZWN0U3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3RTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3RTdWJzY3JpYmVyKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG5leHBvcnRzLlN1YmplY3RTdWJzY3JpYmVyID0gU3ViamVjdFN1YnNjcmliZXI7XG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0PFQ+XG4gKi9cbnZhciBTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0KCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRocm93bkVycm9yID0gbnVsbDtcbiAgICB9XG4gICAgU3ViamVjdC5wcm90b3R5cGVbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJqZWN0U3Vic2NyaWJlcih0aGlzKTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQW5vbnltb3VzU3ViamVjdCh0aGlzLCB0aGlzKTtcbiAgICAgICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3B5W2ldLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgdmFyIGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgIHZhciBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvcHlbaV0uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgdmFyIGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgIHZhciBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvcHlbaV0uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IG51bGw7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhpcy50aHJvd25FcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3ViamVjdFN1YnNjcmlwdGlvbl8xLlN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIFN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3Q7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLlN1YmplY3QgPSBTdWJqZWN0O1xuLyoqXG4gKiBAY2xhc3MgQW5vbnltb3VzU3ViamVjdDxUPlxuICovXG52YXIgQW5vbnltb3VzU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFub255bW91c1N1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5uZXh0KSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQW5vbnltb3VzU3ViamVjdDtcbn0oU3ViamVjdCkpO1xuZXhwb3J0cy5Bbm9ueW1vdXNTdWJqZWN0ID0gQW5vbnltb3VzU3ViamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCB7IFRpbGVtYXAgfSBmcm9tICcuL3NyYy90aWxlbWFwJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LnRzIiwiaW1wb3J0IHsgYWpheCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9kb20vYWpheCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFRpbGUgfSBmcm9tICcuL3RpbGUnO1xuaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL2ltYWdlLWxvYWRlcic7XG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuL2NhbWVyYSc7XG5cbmV4cG9ydCBjbGFzcyBUaWxlbWFwIHtcbiAgICBwcml2YXRlIG5vZGU6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgbWFwQ29uZmlnOiBhbnk7XG4gICAgcHJpdmF0ZSBsb2FkZXI6IEltYWdlTG9hZGVyO1xuICAgIHByaXZhdGUgdGlsZXM6IEFycmF5PFRpbGVbXT4gPSBbXTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBjYW1lcmE6IENhbWVyYTtcbiAgICBwcml2YXRlIGFkZGl0aW9uYWxJbWFnZXM6IEFycmF5PEltYWdlTG9hZGVyPiA9IFtdO1xuICAgIHByaXZhdGUgc3RhcnRYOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc3RhcnRZOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSByZXNpemVIYW5kbGVyOiBFdmVudExpc3RlbmVyT2JqZWN0O1xuXG4gICAgcHJpdmF0ZSByZWFkeTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIGNsaWNrOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgc2hvd1RpbGVzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgdGlsZXNMb2FkZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIG9wdGlvbnM6IGFueSA9IHtcbiAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgbnVtYmVyT2ZUaWxlczogZmFsc2UsXG4gICAgICAgIGluZGV4T2ZUaWxlczogZmFsc2UsXG4gICAgICAgIGdyaWRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgYWRkaXRpb25hbEltYWdlczogW11cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IgKGNhbnZhc0lkOiBzdHJpbmcsIHBhdGhUb0NvbmZpZzogc3RyaW5nLCBvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmlzTW9iaWxlID0gKC9hbmRyb2lkfHdlYm9zfGlwaG9uZXxpcGFkfGlwb2R8YmxhY2tiZXJyeXxpZW1vYmlsZXxvcGVyYSBtaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKTtcblxuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLm5vZGUuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5pbml0KHBhdGhUb0NvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENhbnZhc1NpemUoKSA6dm9pZCB7XG4gICAgICAgIGxldCBwYXJlbnQgPSA8SFRNTEVsZW1lbnQ+IHRoaXMubm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB0aGlzLndpZHRoID0gcGFyZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHBhcmVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDYW52YXNTaXplKCkgOnZvaWQge1xuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRFdmVudHMoKSA6dm9pZCB7XG4gICAgICAgIGxldCB4OiBudW1iZXIsIHk6IG51bWJlciwgaXNNb3ZlOiBib29sZWFuLCBtb3ZlZDogYm9vbGVhbiA9IHRydWU7O1xuXG4gICAgICAgIGxldCBzdGFydCA9IChfeDogbnVtYmVyLCBfeTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB4ID0gX3g7XG4gICAgICAgICAgICB5ID0gX3k7XG4gICAgICAgICAgICBpc01vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuc3RvcCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBtb3ZlID0gKF94OiBudW1iZXIsIF95OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChpc01vdmUpIHtcbiAgICAgICAgICAgICAgICBtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEuc2V0UG9zaXRpb24oX3ggLSB4LCBfeSAtIHkpO1xuICAgICAgICAgICAgICAgIHggPSBfeDtcbiAgICAgICAgICAgICAgICB5ID0gX3k7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGVuZCA9IChfeDogbnVtYmVyLCBfeTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNNb3ZlICYmICFtb3ZlZCkge1xuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IHRoaXMuY2FtZXJhLmdldEluZGV4T2ZUaWxlKF94LCBfeSk7XG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLnRpbGVzW3BvaW50LnldW3BvaW50LnhdO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xpY2sub25OZXh0KCdmb28nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrLm5leHQodGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc3RhcnQoZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBtb3ZlKGUudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbmQoZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbmQoZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc3RhcnQoZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBtb3ZlKGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbmQoZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXcoKSA6dm9pZCB7XG4gICAgICAgIGxldCB0aWxlcyA9IHRoaXMuY2FtZXJhLmdldFRpbGVzKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICB0aWxlcy5mb3JFYWNoKCh0aWxlUG9zaXRpb25zKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMudGlsZXNbdGlsZVBvc2l0aW9ucy55XVt0aWxlUG9zaXRpb25zLnhdLFxuICAgICAgICAgICAgICAgIHBvc1ggPSB0aWxlLnggKiB0aWxlLndpZHRoICsgdGhpcy5jYW1lcmEuWCxcbiAgICAgICAgICAgICAgICBwb3NZID0gdGlsZS55ICogdGlsZS5oZWlnaHQgKyB0aGlzLmNhbWVyYS5ZO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmltYWdlLFxuICAgICAgICAgICAgICAgIHRpbGUuaW1hZ2VYLFxuICAgICAgICAgICAgICAgIHRpbGUuaW1hZ2VZLFxuICAgICAgICAgICAgICAgIHRpbGUud2lkdGgsXG4gICAgICAgICAgICAgICAgdGlsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgcG9zWCxcbiAgICAgICAgICAgICAgICBwb3NZLFxuICAgICAgICAgICAgICAgIHRpbGUud2lkdGgsXG4gICAgICAgICAgICAgICAgdGlsZS5oZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsSW1hZ2VzID0gdGlsZS5nZXRJbWFnZXMoKTtcbiAgICAgICAgICAgIGlmIChhZGRpdGlvbmFsSW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbEltYWdlcy5mb3JFYWNoKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1gsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NZLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUuaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubnVtYmVyT2ZUaWxlcykge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuZ3JpZENvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIjEycHggQXJpYWxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGlsZS5JRCArICcnLCBwb3NYICsgMSwgcG9zWSArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmluZGV4T2ZUaWxlcykge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuZ3JpZENvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9IFwiYm90dG9tXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIjEycHggQXJpYWxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGlsZS54ICsgJyAnICsgdGlsZS55LCBwb3NYICsgMSwgcG9zWSArIDMyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5ncmlkKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdHcmlkKHRoaXMudGlsZXNbdGlsZXNbMF0ueF1bdGlsZXNbMF0ueV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R3JpZCh0aWxlOiBUaWxlKSA6dm9pZCB7XG4gICAgICAgIGxldCBzdGFydFBvaW50LCBwb2ludCxcbiAgICAgICAgICAgIHRpbGVzZXQgPSB0aGlzLm1hcENvbmZpZy50aWxlc2V0c1swXSxcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLm9wdGlvbnMuZ3JpZENvbG9yO1xuXG4gICAgICAgIHN0YXJ0UG9pbnQgPSB0aWxlLnkgKiB0aWxlLndpZHRoICsgdGhpcy5jYW1lcmEuWDtcbiAgICAgICAgcG9pbnQgPSBzdGFydFBvaW50IC0gdGlsZXNldC50aWxld2lkdGg7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHBvaW50ICs9IHRpbGVzZXQudGlsZXdpZHRoO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhwb2ludCAtIDAuNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHBvaW50IC0gMC41LCBoZWlnaHQpO1xuICAgICAgICB9IHdoaWxlKHBvaW50IDwgc3RhcnRQb2ludCArIHdpZHRoKVxuXG4gICAgICAgIHN0YXJ0UG9pbnQgPSB0aWxlLnggKiB0aWxlLmhlaWdodCArIHRoaXMuY2FtZXJhLllcbiAgICAgICAgcG9pbnQgPSBzdGFydFBvaW50IC0gdGlsZXNldC50aWxlaGVpZ2h0O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBwb2ludCArPSB0aWxlc2V0LnRpbGVoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKDAsIHBvaW50IC0gMC41KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8od2lkdGgsIHBvaW50IC0gMC41KTtcbiAgICAgICAgfSB3aGlsZShwb2ludCA8IHN0YXJ0UG9pbnQgKyBoZWlnaHQpXG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29uZmlnKHVybDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIDp2b2lkIHtcbiAgICAgICAgYWpheC5nZXRKU09OKHVybClcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhKSA9PiB7IGNhbGxiYWNrKGRhdGEpOyB9LFxuICAgICAgICAgICAgKGVycikgPT4geyBjb25zb2xlLmxvZygnQ2FuIG5vdCBsb2FkIGNvbmZpZycpOyB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2UgKGNhbGxiYWNrOiBGdW5jdGlvbikgOnZvaWQge1xuICAgICAgICBsZXQgaW1hZ2VzID0gdGhpcy5vcHRpb25zLmFkZGl0aW9uYWxJbWFnZXMubGVuZ3RoICsgMSxcbiAgICAgICAgICAgIGN1cnJlbnRMb2FkZWRJbWFnZXMgPSAwO1xuXG4gICAgICAgIHRoaXMubG9hZGVyID0gbmV3IEltYWdlTG9hZGVyKHRoaXMubWFwQ29uZmlnLnRpbGVzZXRzWzBdLmltYWdlLCAoZXJyOiBhbnksIHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TG9hZGVkSW1hZ2VzICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGltYWdlcyA9PT0gY3VycmVudExvYWRlZEltYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsSW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFkZGl0aW9uYWxJbWFnZXMuZm9yRWFjaCgoc3JjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbG9hZGVyID0gbmV3IEltYWdlTG9hZGVyKHNyYywgKGVycjogYW55LCB2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMb2FkZWRJbWFnZXMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZXMgPT09IGN1cnJlbnRMb2FkZWRJbWFnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZGl0aW9uYWxJbWFnZXMucHVzaChsb2FkZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvblBlck51bWJlcihuOiBudW1iZXIsIHRpbGVzZXQ6IGFueSkgOkFycmF5PG51bWJlcj4ge1xuICAgICAgICBsZXQgcm93cyA9IE1hdGguZmxvb3IobiAvIHRpbGVzZXQuY29sdW1ucyk7XG4gICAgICAgIHJldHVybiBbKG4gLSAxKSAlIHRpbGVzZXQuY29sdW1ucywgcm93c107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVUaWxlcyAoKSA6dm9pZCB7XG4gICAgICAgIGxldCBsYXllciA9IHRoaXMubWFwQ29uZmlnLmxheWVyc1swXTtcbiAgICAgICAgbGV0IHRpbGVzZXQgPSB0aGlzLm1hcENvbmZpZy50aWxlc2V0c1swXTtcbiAgICAgICAgbGV0IHRpbGVDb3VudCA9IHRpbGVzZXQudGlsZWNvdW50O1xuICAgICAgICBsZXQgYXJyOiBUaWxlW10gPSBbXTtcblxuICAgICAgICB0aGlzLm1hcENvbmZpZy5sYXllcnNbMF0uZGF0YS5mb3JFYWNoKCh0OiBudW1iZXIsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKGkgLyBsYXllci5oZWlnaHQpO1xuICAgICAgICAgICAgbGV0IHggPSBpICUgbGF5ZXIud2lkdGg7XG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRQb3NpdGlvblBlck51bWJlcih0LCB0aWxlc2V0KTtcbiAgICAgICAgICAgIGxldCBpbWdQb3NYID0gdGlsZXNldC5zcGFjaW5nICsgcG9zWzBdICogKHRpbGVzZXQudGlsZXdpZHRoICsgdGlsZXNldC5tYXJnaW4pO1xuICAgICAgICAgICAgbGV0IGltZ1Bvc1kgPSB0aWxlc2V0LnNwYWNpbmcgKyBwb3NbMV0gKiAodGlsZXNldC50aWxlaGVpZ2h0ICsgdGlsZXNldC5tYXJnaW4pO1xuXG4gICAgICAgICAgICBhcnIucHVzaChuZXcgVGlsZSh0LCB0aWxlc2V0LnRpbGV3aWR0aCwgdGlsZXNldC50aWxlaGVpZ2h0LCB4LCB5LCBpbWdQb3NYLCBpbWdQb3NZKSk7XG5cbiAgICAgICAgICAgIGlmICh4ID09PSBsYXllci53aWR0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnB1c2goYXJyKTtcbiAgICAgICAgICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0KHBhdGhUb0NvbmZpZzogc3RyaW5nKSA6dm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q29uZmlnKHBhdGhUb0NvbmZpZywgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tYXBDb25maWcgPSBkYXRhO1xuICAgICAgICAgICAgbGV0IHRpbGVzZXQgPSB0aGlzLm1hcENvbmZpZy50aWxlc2V0c1swXTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm1hcENvbmZpZy50aWxlc2V0c1swXS5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBDb25maWcudGlsZXNldHNbMF0uY29sdW1ucyA9IE1hdGguZmxvb3IoKHRpbGVzZXQuaW1hZ2V3aWR0aCAtIHRpbGVzZXQuc3BhY2luZykgLyAodGlsZXNldC50aWxld2lkdGggKyB0aWxlc2V0Lm1hcmdpbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLm1hcENvbmZpZy5sYXllcnNbMF07XG4gICAgICAgICAgICB0aGlzLmdldENhbnZhc1NpemUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aWxlc2V0LnRpbGV3aWR0aCAqIGxheWVyLndpZHRoLCB0aWxlc2V0LnRpbGVoZWlnaHQgKiBsYXllci5oZWlnaHQsIHRpbGVzZXQudGlsZXdpZHRoLCB0aWxlc2V0LnRpbGVoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuc2V0U3RhcnRQb3NpdGlvbih0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFkpO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuZHJhd0V2ZW50LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmFuaW1hdGlvbkVuZEV2ZW50LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU2hvd1RpbGVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubG9hZEltYWdlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRpbGVzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFdmVudHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZHkubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFNob3dUaWxlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VuZFNob3dUaWxlcygpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93VGlsZXMubmV4dCh0aGlzLnRpbGVzRmlsdGVyKHRoaXMuY2FtZXJhLmdldFRpbGVzKCkpKTtcbiAgICAgICAgdGhpcy50aWxlc0xvYWRlci5uZXh0KHsgaXNMb2FkaW5nOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGlsZXNGaWx0ZXIgKHRpbGVzOiBhbnkpIDpBcnJheTxhbnk+IHtcbiAgICAgICAgbGV0IGFycjogYW55ID0gW107XG5cbiAgICAgICAgdGlsZXMuZm9yRWFjaCgocG9pbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLnRpbGVzW3BvaW50LnldW3BvaW50LnhdO1xuICAgICAgICAgICAgaWYgKHRpbGUuU3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGlsZS5zZXRSZXF1ZXN0aW5nU3RhdHVzKCk7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNBbGxMb2FkZWQoKSA6Ym9vbGVhbiB7XG4gICAgICAgIGxldCBpLCByZXN1bHQgPSB0cnVlLFxuICAgICAgICAgICAgcG9pbnRzID0gdGhpcy5jYW1lcmEuZ2V0VGlsZXMoKSxcbiAgICAgICAgICAgIGwgPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IHBvaW50c1tpXSxcbiAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy50aWxlc1twb2ludC55XVtwb2ludC54XTtcblxuICAgICAgICAgICAgaWYgKHRpbGUuU3RhdHVzICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplICgpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDYW52YXNTaXplKCk7XG4gICAgICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSgpO1xuICAgICAgICB0aGlzLmNhbWVyYS5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWR5RXZlbnQoKSA6U3ViamVjdDxhbnk+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucmVhZHkubmV4dCgpOyB9LCA1MCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjbGlja0V2ZW50KCkgOlN1YmplY3Q8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWNrO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2hvd1RpbGVzRXZlbnQoKSA6U3ViamVjdDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1RpbGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdGlsZXNMb2FkZXJFdmVudCgpIDpTdWJqZWN0PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlc0xvYWRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZVRvKGluZGV4WDogbnVtYmVyLCBpbmRleFk6IG51bWJlcikgOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5tb3ZlKGluZGV4WCwgaW5kZXhZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYID0gaW5kZXhYO1xuICAgICAgICAgICAgdGhpcy5zdGFydFkgPSBpbmRleFk7XG4gICAgICAgICAgICBpZiAodGhpcy5jYW1lcmEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5zZXRTdGFydFBvc2l0aW9uKHRoaXMuc3RhcnRYLCB0aGlzLnN0YXJ0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TGF5ZXJUb1RpbGUob3B0aW9uczogYW55KSA6dm9pZCB7XG4gICAgICAgIGxldCB0aWxlID0gdGhpcy50aWxlc1tvcHRpb25zLnldW29wdGlvbnMueF07XG4gICAgICAgIHRpbGUuc2V0UmVxdWVzdGVkU3RhdHVzKCk7XG4gICAgICAgIGlmICghb3B0aW9ucy5lbXB0eSkge1xuICAgICAgICAgICAgdGlsZS5hZGRJbWFnZSh0aGlzLmFkZGl0aW9uYWxJbWFnZXNbb3B0aW9ucy5hZGRpdGlvbmFsSW1hZ2VdLmltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNBbGxMb2FkZWQoKSkgeyB0aGlzLnRpbGVzTG9hZGVyLm5leHQoeyBpc0xvYWRpbmc6IGZhbHNlIH0pOyB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKSA6dm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90aWxlbWFwLnRzIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQWpheE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vQWpheE9ic2VydmFibGUnKTtcbmV4cG9ydHMuYWpheCA9IEFqYXhPYnNlcnZhYmxlXzEuQWpheE9ic2VydmFibGUuY3JlYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWpheC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvZG9tL2FqYXguanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9yb290Jyk7XG52YXIgdHJ5Q2F0Y2hfMSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvdHJ5Q2F0Y2gnKTtcbnZhciBlcnJvck9iamVjdF8xID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lcnJvck9iamVjdCcpO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuLi8uLi9TdWJzY3JpYmVyJyk7XG52YXIgbWFwXzEgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRvcnMvbWFwJyk7XG5mdW5jdGlvbiBnZXRDT1JTUmVxdWVzdCgpIHtcbiAgICBpZiAocm9vdF8xLnJvb3QuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyByb290XzEucm9vdC5YTUxIdHRwUmVxdWVzdCgpO1xuICAgIH1cbiAgICBlbHNlIGlmICghIXJvb3RfMS5yb290LlhEb21haW5SZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgcm9vdF8xLnJvb3QuWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ09SUyBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFhNTEh0dHBSZXF1ZXN0KCkge1xuICAgIGlmIChyb290XzEucm9vdC5YTUxIdHRwUmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IHJvb3RfMS5yb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgcHJvZ0lkID0gdm9pZCAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHByb2dJZHMgPSBbJ01zeG1sMi5YTUxIVFRQJywgJ01pY3Jvc29mdC5YTUxIVFRQJywgJ01zeG1sMi5YTUxIVFRQLjQuMCddO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBwcm9nSWQgPSBwcm9nSWRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3IHJvb3RfMS5yb290LkFjdGl2ZVhPYmplY3QocHJvZ0lkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IHJvb3RfMS5yb290LkFjdGl2ZVhPYmplY3QocHJvZ0lkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdYTUxIdHRwUmVxdWVzdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gYWpheEdldCh1cmwsIGhlYWRlcnMpIHtcbiAgICBpZiAoaGVhZGVycyA9PT0gdm9pZCAwKSB7IGhlYWRlcnMgPSBudWxsOyB9XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ0dFVCcsIHVybDogdXJsLCBoZWFkZXJzOiBoZWFkZXJzIH0pO1xufVxuZXhwb3J0cy5hamF4R2V0ID0gYWpheEdldDtcbjtcbmZ1bmN0aW9uIGFqYXhQb3N0KHVybCwgYm9keSwgaGVhZGVycykge1xuICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUoeyBtZXRob2Q6ICdQT1NUJywgdXJsOiB1cmwsIGJvZHk6IGJvZHksIGhlYWRlcnM6IGhlYWRlcnMgfSk7XG59XG5leHBvcnRzLmFqYXhQb3N0ID0gYWpheFBvc3Q7XG47XG5mdW5jdGlvbiBhamF4RGVsZXRlKHVybCwgaGVhZGVycykge1xuICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUoeyBtZXRob2Q6ICdERUxFVEUnLCB1cmw6IHVybCwgaGVhZGVyczogaGVhZGVycyB9KTtcbn1cbmV4cG9ydHMuYWpheERlbGV0ZSA9IGFqYXhEZWxldGU7XG47XG5mdW5jdGlvbiBhamF4UHV0KHVybCwgYm9keSwgaGVhZGVycykge1xuICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUoeyBtZXRob2Q6ICdQVVQnLCB1cmw6IHVybCwgYm9keTogYm9keSwgaGVhZGVyczogaGVhZGVycyB9KTtcbn1cbmV4cG9ydHMuYWpheFB1dCA9IGFqYXhQdXQ7XG47XG5mdW5jdGlvbiBhamF4UGF0Y2godXJsLCBib2R5LCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ1BBVENIJywgdXJsOiB1cmwsIGJvZHk6IGJvZHksIGhlYWRlcnM6IGhlYWRlcnMgfSk7XG59XG5leHBvcnRzLmFqYXhQYXRjaCA9IGFqYXhQYXRjaDtcbjtcbnZhciBtYXBSZXNwb25zZSA9IG1hcF8xLm1hcChmdW5jdGlvbiAoeCwgaW5kZXgpIHsgcmV0dXJuIHgucmVzcG9uc2U7IH0pO1xuZnVuY3Rpb24gYWpheEdldEpTT04odXJsLCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG1hcFJlc3BvbnNlKG5ldyBBamF4T2JzZXJ2YWJsZSh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgIH0pKTtcbn1cbmV4cG9ydHMuYWpheEdldEpTT04gPSBhamF4R2V0SlNPTjtcbjtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG52YXIgQWpheE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBamF4T2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBamF4T2JzZXJ2YWJsZSh1cmxPclJlcXVlc3QpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBjcmVhdGVYSFI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcm9zc0RvbWFpbiA/IGdldENPUlNSZXF1ZXN0LmNhbGwodGhpcykgOiBnZXRYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyb3NzRG9tYWluOiBmYWxzZSxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB1cmxPclJlcXVlc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXF1ZXN0LnVybCA9IHVybE9yUmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gdXJsT3JSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHVybE9yUmVxdWVzdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0W3Byb3BdID0gdXJsT3JSZXF1ZXN0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBBamF4T2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5yZXF1ZXN0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gb2JzZXJ2YWJsZSBmb3IgYW4gQWpheCByZXF1ZXN0IHdpdGggZWl0aGVyIGEgcmVxdWVzdCBvYmplY3Qgd2l0aFxuICAgICAqIHVybCwgaGVhZGVycywgZXRjIG9yIGEgc3RyaW5nIGZvciBhIFVSTC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc291cmNlID0gUnguT2JzZXJ2YWJsZS5hamF4KCcvcHJvZHVjdHMnKTtcbiAgICAgKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoeyB1cmw6ICdwcm9kdWN0cycsIG1ldGhvZDogJ0dFVCcgfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IHJlcXVlc3QgQ2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAqICAgQSBzdHJpbmcgb2YgdGhlIFVSTCB0byBtYWtlIHRoZSBBamF4IGNhbGwuXG4gICAgICogICBBbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAgICAgKiAgIC0gdXJsOiBVUkwgb2YgdGhlIHJlcXVlc3RcbiAgICAgKiAgIC0gYm9keTogVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3RcbiAgICAgKiAgIC0gbWV0aG9kOiBNZXRob2Qgb2YgdGhlIHJlcXVlc3QsIHN1Y2ggYXMgR0VULCBQT1NULCBQVVQsIFBBVENILCBERUxFVEVcbiAgICAgKiAgIC0gYXN5bmM6IFdoZXRoZXIgdGhlIHJlcXVlc3QgaXMgYXN5bmNcbiAgICAgKiAgIC0gaGVhZGVyczogT3B0aW9uYWwgaGVhZGVyc1xuICAgICAqICAgLSBjcm9zc0RvbWFpbjogdHJ1ZSBpZiBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LCBlbHNlIGZhbHNlXG4gICAgICogICAtIGNyZWF0ZVhIUjogYSBmdW5jdGlvbiB0byBvdmVycmlkZSBpZiB5b3UgbmVlZCB0byB1c2UgYW4gYWx0ZXJuYXRlXG4gICAgICogICBYTUxIdHRwUmVxdWVzdCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKiAgIC0gcmVzdWx0U2VsZWN0b3I6IGEgZnVuY3Rpb24gdG8gdXNlIHRvIGFsdGVyIHRoZSBvdXRwdXQgdmFsdWUgdHlwZSBvZlxuICAgICAqICAgdGhlIE9ic2VydmFibGUuIEdldHMge0BsaW5rIEFqYXhSZXNwb25zZX0gYXMgYW4gYXJndW1lbnQuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBjb250YWluaW5nIHRoZSBYTUxIdHRwUmVxdWVzdC5cbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAbmFtZSBhamF4XG4gICAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICAqL1xuICAgIEFqYXhPYnNlcnZhYmxlLmNyZWF0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjcmVhdGUgPSBmdW5jdGlvbiAodXJsT3JSZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHVybE9yUmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICAgIGNyZWF0ZS5nZXQgPSBhamF4R2V0O1xuICAgICAgICBjcmVhdGUucG9zdCA9IGFqYXhQb3N0O1xuICAgICAgICBjcmVhdGUuZGVsZXRlID0gYWpheERlbGV0ZTtcbiAgICAgICAgY3JlYXRlLnB1dCA9IGFqYXhQdXQ7XG4gICAgICAgIGNyZWF0ZS5wYXRjaCA9IGFqYXhQYXRjaDtcbiAgICAgICAgY3JlYXRlLmdldEpTT04gPSBhamF4R2V0SlNPTjtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZTtcbiAgICB9KSgpO1xuICAgIHJldHVybiBBamF4T2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuQWpheE9ic2VydmFibGUgPSBBamF4T2JzZXJ2YWJsZTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgQWpheFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBamF4U3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBamF4U3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgcmVxdWVzdCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgLy8gZm9yY2UgQ09SUyBpZiByZXF1ZXN0ZWRcbiAgICAgICAgaWYgKCFyZXF1ZXN0LmNyb3NzRG9tYWluICYmICFoZWFkZXJzWydYLVJlcXVlc3RlZC1XaXRoJ10pIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIGNvbnRlbnQgdHlwZSBpcyBzZXRcbiAgICAgICAgaWYgKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgIShyb290XzEucm9vdC5Gb3JtRGF0YSAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiByb290XzEucm9vdC5Gb3JtRGF0YSkgJiYgdHlwZW9mIHJlcXVlc3QuYm9keSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJvcGVybHkgc2VyaWFsaXplIGJvZHlcbiAgICAgICAgcmVxdWVzdC5ib2R5ID0gdGhpcy5zZXJpYWxpemVCb2R5KHJlcXVlc3QuYm9keSwgcmVxdWVzdC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSk7XG4gICAgICAgIHRoaXMuc2VuZCgpO1xuICAgIH1cbiAgICBBamF4U3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIHhociA9IF9hLnhociwgcmVxdWVzdCA9IF9hLnJlcXVlc3QsIGRlc3RpbmF0aW9uID0gX2EuZGVzdGluYXRpb247XG4gICAgICAgIHZhciByZXNwb25zZSA9IG5ldyBBamF4UmVzcG9uc2UoZSwgeGhyLCByZXF1ZXN0KTtcbiAgICAgICAgZGVzdGluYXRpb24ubmV4dChyZXNwb25zZSk7XG4gICAgfTtcbiAgICBBamF4U3Vic2NyaWJlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgcmVxdWVzdCA9IF9hLnJlcXVlc3QsIF9iID0gX2EucmVxdWVzdCwgdXNlciA9IF9iLnVzZXIsIG1ldGhvZCA9IF9iLm1ldGhvZCwgdXJsID0gX2IudXJsLCBhc3luYyA9IF9iLmFzeW5jLCBwYXNzd29yZCA9IF9iLnBhc3N3b3JkLCBoZWFkZXJzID0gX2IuaGVhZGVycywgYm9keSA9IF9iLmJvZHk7XG4gICAgICAgIHZhciBjcmVhdGVYSFIgPSByZXF1ZXN0LmNyZWF0ZVhIUjtcbiAgICAgICAgdmFyIHhociA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goY3JlYXRlWEhSKS5jYWxsKHJlcXVlc3QpO1xuICAgICAgICBpZiAoeGhyID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnhociA9IHhocjtcbiAgICAgICAgICAgIC8vIHNldCB1cCB0aGUgZXZlbnRzIGJlZm9yZSBvcGVuIFhIUlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L1VzaW5nX1hNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICAvLyBZb3UgbmVlZCB0byBhZGQgdGhlIGV2ZW50IGxpc3RlbmVycyBiZWZvcmUgY2FsbGluZyBvcGVuKCkgb24gdGhlIHJlcXVlc3QuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgdGhlIHByb2dyZXNzIGV2ZW50cyB3aWxsIG5vdCBmaXJlLlxuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50cyh4aHIsIHJlcXVlc3QpO1xuICAgICAgICAgICAgLy8gb3BlbiBYSFJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goeGhyLm9wZW4pLmNhbGwoeGhyLCBtZXRob2QsIHVybCwgYXN5bmMsIHVzZXIsIHBhc3N3b3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goeGhyLm9wZW4pLmNhbGwoeGhyLCBtZXRob2QsIHVybCwgYXN5bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRpbWVvdXQsIHJlc3BvbnNlVHlwZSBhbmQgd2l0aENyZWRlbnRpYWxzIGNhbiBiZSBzZXQgb25jZSB0aGUgWEhSIGlzIG9wZW5cbiAgICAgICAgICAgIGlmIChhc3luYykge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gcmVxdWVzdC50aW1lb3V0O1xuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFyZXF1ZXN0LndpdGhDcmVkZW50aWFscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCBoZWFkZXJzXG4gICAgICAgICAgICB0aGlzLnNldEhlYWRlcnMoeGhyLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIC8vIGZpbmFsbHkgc2VuZCB0aGUgcmVxdWVzdFxuICAgICAgICAgICAgcmVzdWx0ID0gYm9keSA/IHRyeUNhdGNoXzEudHJ5Q2F0Y2goeGhyLnNlbmQpLmNhbGwoeGhyLCBib2R5KSA6IHRyeUNhdGNoXzEudHJ5Q2F0Y2goeGhyLnNlbmQpLmNhbGwoeGhyKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuICAgIEFqYXhTdWJzY3JpYmVyLnByb3RvdHlwZS5zZXJpYWxpemVCb2R5ID0gZnVuY3Rpb24gKGJvZHksIGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIGlmICghYm9keSB8fCB0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvb3RfMS5yb290LkZvcm1EYXRhICYmIGJvZHkgaW5zdGFuY2VvZiByb290XzEucm9vdC5Gb3JtRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICB2YXIgc3BsaXRJbmRleCA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJzsnKTtcbiAgICAgICAgICAgIGlmIChzcGxpdEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuc3Vic3RyaW5nKDAsIHNwbGl0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGJvZHkpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAoZW5jb2RlVVJJKGtleSkgKyBcIj1cIiArIGVuY29kZVVSSShib2R5W2tleV0pKTsgfSkuam9pbignJicpO1xuICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWpheFN1YnNjcmliZXIucHJvdG90eXBlLnNldEhlYWRlcnMgPSBmdW5jdGlvbiAoeGhyLCBoZWFkZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBamF4U3Vic2NyaWJlci5wcm90b3R5cGUuc2V0dXBFdmVudHMgPSBmdW5jdGlvbiAoeGhyLCByZXF1ZXN0KSB7XG4gICAgICAgIHZhciBwcm9ncmVzc1N1YnNjcmliZXIgPSByZXF1ZXN0LnByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgICAgZnVuY3Rpb24geGhyVGltZW91dChlKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB4aHJUaW1lb3V0LCBzdWJzY3JpYmVyID0gX2Euc3Vic2NyaWJlciwgcHJvZ3Jlc3NTdWJzY3JpYmVyID0gX2EucHJvZ3Jlc3NTdWJzY3JpYmVyLCByZXF1ZXN0ID0gX2EucmVxdWVzdDtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKG5ldyBBamF4VGltZW91dEVycm9yKHRoaXMsIHJlcXVlc3QpKTsgLy9UT0RPOiBNYWtlIGJldHRlcmVyLlxuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgeGhyLm9udGltZW91dCA9IHhoclRpbWVvdXQ7XG4gICAgICAgIHhoclRpbWVvdXQucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHhoclRpbWVvdXQuc3Vic2NyaWJlciA9IHRoaXM7XG4gICAgICAgIHhoclRpbWVvdXQucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICBpZiAoeGhyLnVwbG9hZCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgeGhyUHJvZ3Jlc3NfMTtcbiAgICAgICAgICAgICAgICB4aHJQcm9ncmVzc18xID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzU3Vic2NyaWJlciA9IHhoclByb2dyZXNzXzEucHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChyb290XzEucm9vdC5YRG9tYWluUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICB4aHIub25wcm9ncmVzcyA9IHhoclByb2dyZXNzXzE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSB4aHJQcm9ncmVzc18xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB4aHJQcm9ncmVzc18xLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB4aHJFcnJvcl8xO1xuICAgICAgICAgICAgeGhyRXJyb3JfMSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0geGhyRXJyb3JfMSwgcHJvZ3Jlc3NTdWJzY3JpYmVyID0gX2EucHJvZ3Jlc3NTdWJzY3JpYmVyLCBzdWJzY3JpYmVyID0gX2Euc3Vic2NyaWJlciwgcmVxdWVzdCA9IF9hLnJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhFcnJvcignYWpheCBlcnJvcicsIHRoaXMsIHJlcXVlc3QpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub25lcnJvciA9IHhockVycm9yXzE7XG4gICAgICAgICAgICB4aHJFcnJvcl8xLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICAgICAgeGhyRXJyb3JfMS5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICAgICAgIHhockVycm9yXzEucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHhoclJlYWR5U3RhdGVDaGFuZ2UoZSkge1xuICAgICAgICAgICAgdmFyIF9hID0geGhyUmVhZHlTdGF0ZUNoYW5nZSwgc3Vic2NyaWJlciA9IF9hLnN1YnNjcmliZXIsIHByb2dyZXNzU3Vic2NyaWJlciA9IF9hLnByb2dyZXNzU3Vic2NyaWJlciwgcmVxdWVzdCA9IF9hLnJlcXVlc3Q7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsaXplIElFOSBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTApXG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1c18xID0gdGhpcy5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB0aGlzLnN0YXR1cztcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSAodGhpcy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/ICh0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0KSA6IHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGZpeCBzdGF0dXMgY29kZSB3aGVuIGl0IGlzIDAgKDAgc3RhdHVzIGlzIHVuZG9jdW1lbnRlZCkuXG4gICAgICAgICAgICAgICAgLy8gT2NjdXJzIHdoZW4gYWNjZXNzaW5nIGZpbGUgcmVzb3VyY2VzIG9yIG9uIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcbiAgICAgICAgICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1c18xID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c18xID0gcmVzcG9uc2UgPyAyMDAgOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoMjAwIDw9IHN0YXR1c18xICYmIHN0YXR1c18xIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhFcnJvcignYWpheCBlcnJvciAnICsgc3RhdHVzXzEsIHRoaXMsIHJlcXVlc3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0geGhyUmVhZHlTdGF0ZUNoYW5nZTtcbiAgICAgICAgeGhyUmVhZHlTdGF0ZUNoYW5nZS5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICAgeGhyUmVhZHlTdGF0ZUNoYW5nZS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgIHhoclJlYWR5U3RhdGVDaGFuZ2UucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfTtcbiAgICBBamF4U3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGRvbmUgPSBfYS5kb25lLCB4aHIgPSBfYS54aHI7XG4gICAgICAgIGlmICghZG9uZSAmJiB4aHIgJiYgeGhyLnJlYWR5U3RhdGUgIT09IDQgJiYgdHlwZW9mIHhoci5hYm9ydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIEFqYXhTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5BamF4U3Vic2NyaWJlciA9IEFqYXhTdWJzY3JpYmVyO1xuLyoqXG4gKiBBIG5vcm1hbGl6ZWQgQUpBWCByZXNwb25zZS5cbiAqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4UmVzcG9uc2VcbiAqL1xudmFyIEFqYXhSZXNwb25zZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWpheFJlc3BvbnNlKG9yaWdpbmFsRXZlbnQsIHhociwgcmVxdWVzdCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsRXZlbnQgPSBvcmlnaW5hbEV2ZW50O1xuICAgICAgICB0aGlzLnhociA9IHhocjtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHhoci5yZXNwb25zZVR5cGUgfHwgcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSBwYXJzZVhoclJlc3BvbnNlKHRoaXMucmVzcG9uc2VUeXBlLCB4aHIpO1xuICAgIH1cbiAgICByZXR1cm4gQWpheFJlc3BvbnNlO1xufSgpKTtcbmV4cG9ydHMuQWpheFJlc3BvbnNlID0gQWpheFJlc3BvbnNlO1xuLyoqXG4gKiBBIG5vcm1hbGl6ZWQgQUpBWCBlcnJvci5cbiAqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4RXJyb3JcbiAqL1xudmFyIEFqYXhFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFqYXhFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBamF4RXJyb3IobWVzc2FnZSwgeGhyLCByZXF1ZXN0KSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnhociA9IHhocjtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHhoci5yZXNwb25zZVR5cGUgfHwgcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSBwYXJzZVhoclJlc3BvbnNlKHRoaXMucmVzcG9uc2VUeXBlLCB4aHIpO1xuICAgIH1cbiAgICByZXR1cm4gQWpheEVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5BamF4RXJyb3IgPSBBamF4RXJyb3I7XG5mdW5jdGlvbiBwYXJzZVhoclJlc3BvbnNlKHJlc3BvbnNlVHlwZSwgeGhyKSB7XG4gICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICBpZiAoJ3Jlc3BvbnNlJyBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICAvL0lFIGRvZXMgbm90IHN1cHBvcnQganNvbiBhcyByZXNwb25zZVR5cGUsIHBhcnNlIGl0IGludGVybmFsbHlcbiAgICAgICAgICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVHlwZSA/IHhoci5yZXNwb25zZSA6IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlIHx8IHhoci5yZXNwb25zZVRleHQgfHwgJ251bGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQgfHwgJ251bGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAneG1sJzpcbiAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUw7XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICgncmVzcG9uc2UnIGluIHhocikgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0O1xuICAgIH1cbn1cbi8qKlxuICogQHNlZSB7QGxpbmsgYWpheH1cbiAqXG4gKiBAY2xhc3MgQWpheFRpbWVvdXRFcnJvclxuICovXG52YXIgQWpheFRpbWVvdXRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFqYXhUaW1lb3V0RXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWpheFRpbWVvdXRFcnJvcih4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgJ2FqYXggdGltZW91dCcsIHhociwgcmVxdWVzdCk7XG4gICAgfVxuICAgIHJldHVybiBBamF4VGltZW91dEVycm9yO1xufShBamF4RXJyb3IpKTtcbmV4cG9ydHMuQWpheFRpbWVvdXRFcnJvciA9IEFqYXhUaW1lb3V0RXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BamF4T2JzZXJ2YWJsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvZG9tL0FqYXhPYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmliZXInKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbnZhciBPYnNlcnZlcl8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2ZXInKTtcbmZ1bmN0aW9uIHRvU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0T3JPYnNlcnZlciAmJiAhZXJyb3IgJiYgIWNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIoT2JzZXJ2ZXJfMS5lbXB0eSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG5leHBvcnRzLnRvU3Vic2NyaWJlciA9IHRvU3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvU3Vic2NyaWJlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcic7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4vKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIG9uZSBvciBtb3JlIGVycm9ycyBoYXZlIG9jY3VycmVkIGR1cmluZyB0aGVcbiAqIGB1bnN1YnNjcmliZWAgb2YgYSB7QGxpbmsgU3Vic2NyaXB0aW9ufS5cbiAqL1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVbnN1YnNjcmlwdGlvbkVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgdmFyIGVyciA9IEVycm9yLmNhbGwodGhpcywgZXJyb3JzID9cbiAgICAgICAgICAgIGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcbiAgXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuICgoaSArIDEpICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCkpOyB9KS5qb2luKCdcXG4gICcpIDogJycpO1xuICAgICAgICB0aGlzLm5hbWUgPSBlcnIubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiBVbnN1YnNjcmlwdGlvbkVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5VbnN1YnNjcmlwdGlvbkVycm9yID0gVW5zdWJzY3JpcHRpb25FcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvcm9vdCcpO1xuZnVuY3Rpb24gZ2V0U3ltYm9sT2JzZXJ2YWJsZShjb250ZXh0KSB7XG4gICAgdmFyICQkb2JzZXJ2YWJsZTtcbiAgICB2YXIgU3ltYm9sID0gY29udGV4dC5TeW1ib2w7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2wub2JzZXJ2YWJsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuICAgICAgICAgICAgU3ltYm9sLm9ic2VydmFibGUgPSAkJG9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQkb2JzZXJ2YWJsZSA9ICdAQG9ic2VydmFibGUnO1xuICAgIH1cbiAgICByZXR1cm4gJCRvYnNlcnZhYmxlO1xufVxuZXhwb3J0cy5nZXRTeW1ib2xPYnNlcnZhYmxlID0gZ2V0U3ltYm9sT2JzZXJ2YWJsZTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGUocm9vdF8xLnJvb3QpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Ugb2JzZXJ2YWJsZSBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRvYnNlcnZhYmxlID0gZXhwb3J0cy5vYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3N5bWJvbC9vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBub29wXzEgPSByZXF1aXJlKCcuL25vb3AnKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5mdW5jdGlvbiBwaXBlKCkge1xuICAgIHZhciBmbnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmbnNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBwaXBlRnJvbUFycmF5KGZucyk7XG59XG5leHBvcnRzLnBpcGUgPSBwaXBlO1xuLyogQGludGVybmFsICovXG5mdW5jdGlvbiBwaXBlRnJvbUFycmF5KGZucykge1xuICAgIGlmICghZm5zKSB7XG4gICAgICAgIHJldHVybiBub29wXzEubm9vcDtcbiAgICB9XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBpcGVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBmbikgeyByZXR1cm4gZm4ocHJldik7IH0sIGlucHV0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5waXBlRnJvbUFycmF5ID0gcGlwZUZyb21BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3BpcGUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cbmZ1bmN0aW9uIG5vb3AoKSB7IH1cbmV4cG9ydHMubm9vcCA9IG5vb3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub29wLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9ub29wLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmliZXInKTtcbi8qKlxuICogQXBwbGllcyBhIGdpdmVuIGBwcm9qZWN0YCBmdW5jdGlvbiB0byBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSwgYW5kIGVtaXRzIHRoZSByZXN1bHRpbmcgdmFsdWVzIGFzIGFuIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2UgW0FycmF5LnByb3RvdHlwZS5tYXAoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKSxcbiAqIGl0IHBhc3NlcyBlYWNoIHNvdXJjZSB2YWx1ZSB0aHJvdWdoIGEgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gdG8gZ2V0XG4gKiBjb3JyZXNwb25kaW5nIG91dHB1dCB2YWx1ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWFwLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFNpbWlsYXIgdG8gdGhlIHdlbGwga25vd24gYEFycmF5LnByb3RvdHlwZS5tYXBgIGZ1bmN0aW9uLCB0aGlzIG9wZXJhdG9yXG4gKiBhcHBsaWVzIGEgcHJvamVjdGlvbiB0byBlYWNoIHZhbHVlIGFuZCBlbWl0cyB0aGF0IHByb2plY3Rpb24gaW4gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgY2xpY2sgdG8gdGhlIGNsaWVudFggcG9zaXRpb24gb2YgdGhhdCBjbGljazwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG9zaXRpb25zID0gY2xpY2tzLm1hcChldiA9PiBldi5jbGllbnRYKTtcbiAqIHBvc2l0aW9ucy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgbWFwVG99XG4gKiBAc2VlIHtAbGluayBwbHVja31cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogUn0gcHJvamVjdCBUaGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIHRvIGVhY2ggYHZhbHVlYCBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gVGhlIGBpbmRleGAgcGFyYW1ldGVyIGlzXG4gKiB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggZW1pc3Npb24gdGhhdCBoYXMgaGFwcGVuZWQgc2luY2UgdGhlXG4gKiBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlciBgMGAuXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGRlZmluZSB3aGF0IGB0aGlzYCBpcyBpbiB0aGVcbiAqIGBwcm9qZWN0YCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB0cmFuc2Zvcm1lZCBieSB0aGUgZ2l2ZW4gYHByb2plY3RgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBtYXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1hcE9wZXJhdGlvbihzb3VyY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBpcyBub3QgYSBmdW5jdGlvbi4gQXJlIHlvdSBsb29raW5nIGZvciBgbWFwVG8oKWA/Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBNYXBPcGVyYXRvcihwcm9qZWN0LCB0aGlzQXJnKSk7XG4gICAgfTtcbn1cbmV4cG9ydHMubWFwID0gbWFwO1xudmFyIE1hcE9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYXBPcGVyYXRvcihwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgfVxuICAgIE1hcE9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgTWFwU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByb2plY3QsIHRoaXMudGhpc0FyZykpO1xuICAgIH07XG4gICAgcmV0dXJuIE1hcE9wZXJhdG9yO1xufSgpKTtcbmV4cG9ydHMuTWFwT3BlcmF0b3IgPSBNYXBPcGVyYXRvcjtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgTWFwU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1hcFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFwU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgcHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnIHx8IHRoaXM7XG4gICAgfVxuICAgIC8vIE5PVEU6IFRoaXMgbG9va3MgdW5vcHRpbWl6ZWQsIGJ1dCBpdCdzIGFjdHVhbGx5IHB1cnBvc2VmdWxseSBOT1RcbiAgICAvLyB1c2luZyB0cnkvY2F0Y2ggb3B0aW1pemF0aW9ucy5cbiAgICBNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0LmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFwU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9ycy9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4vKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGFuIGFjdGlvbiBpcyBpbnZhbGlkIGJlY2F1c2UgdGhlIG9iamVjdCBoYXMgYmVlblxuICogdW5zdWJzY3JpYmVkLlxuICpcbiAqIEBzZWUge0BsaW5rIFN1YmplY3R9XG4gKiBAc2VlIHtAbGluayBCZWhhdmlvclN1YmplY3R9XG4gKlxuICogQGNsYXNzIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXG4gKi9cbnZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9iamVjdFVuc3Vic2NyaWJlZEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCkge1xuICAgICAgICB2YXIgZXJyID0gX3N1cGVyLmNhbGwodGhpcywgJ29iamVjdCB1bnN1YnNjcmliZWQnKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXJyLm5hbWUgPSAnT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5PYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpcHRpb24nKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgU3ViamVjdFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3RTdWJzY3JpcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdFN1YnNjcmlwdGlvbihzdWJqZWN0LCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgICB0aGlzLnN1YnNjcmliZXIgPSBzdWJzY3JpYmVyO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBTdWJqZWN0U3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB2YXIgc3ViamVjdCA9IHRoaXMuc3ViamVjdDtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHN1YmplY3Qub2JzZXJ2ZXJzO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBudWxsO1xuICAgICAgICBpZiAoIW9ic2VydmVycyB8fCBvYnNlcnZlcnMubGVuZ3RoID09PSAwIHx8IHN1YmplY3QuaXNTdG9wcGVkIHx8IHN1YmplY3QuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmliZXJJbmRleCA9IG9ic2VydmVycy5pbmRleE9mKHRoaXMuc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKHN1YnNjcmliZXJJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTdWJqZWN0U3Vic2NyaXB0aW9uO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuU3ViamVjdFN1YnNjcmlwdGlvbiA9IFN1YmplY3RTdWJzY3JpcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0U3Vic2NyaXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvU3ViamVjdFN1YnNjcmlwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNsYXNzIFRpbGUge1xuICAgIHByaXZhdGUgaWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF94OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfeTogbnVtYmVyO1xuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF9pbWFnZVBvc2l0aW9uWDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2ltYWdlUG9zaXRpb25ZOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIG90aGVyTGF5ZXJzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xuXG4gICAgcHJpdmF0ZSByZXF1ZXN0U3RhdHVzOiBudW1iZXIgPSAwOyAvLyAwIC0gbm90IHJlcXVlc3RlZCwgMSAtIHJlcXVlc3RpbmcsIDIgLSByZXF1ZXN0ZWRcblxuICAgIGNvbnN0cnVjdG9yIChpZDogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW5kZXhPZkFycmF5WDogbnVtYmVyLCBpbmRleE9mQXJyYXlZOiBudW1iZXIsIGltYWdlUG9zaXRpb25YOiBudW1iZXIsIGltYWdlUG9zaXRpb25ZOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLl94ID0gaW5kZXhPZkFycmF5WDtcbiAgICAgICAgdGhpcy5feSA9IGluZGV4T2ZBcnJheVk7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLl9pbWFnZVBvc2l0aW9uWCA9IGltYWdlUG9zaXRpb25YO1xuICAgICAgICB0aGlzLl9pbWFnZVBvc2l0aW9uWSA9IGltYWdlUG9zaXRpb25ZO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgSUQoKSA6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB4KCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgeSgpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHdpZHRoKCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGhlaWdodCgpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaW1hZ2VYKCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVBvc2l0aW9uWDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGltYWdlWSgpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VQb3NpdGlvblk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBTdGF0dXMoKSA6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFN0YXR1cztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UmVxdWVzdGluZ1N0YXR1cygpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U3RhdHVzID0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UmVxdWVzdGVkU3RhdHVzKCkgOnZvaWQge1xuICAgICAgICB0aGlzLnJlcXVlc3RTdGF0dXMgPSAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRJbWFnZShpbWFnZTogSFRNTEltYWdlRWxlbWVudCkgOnZvaWQge1xuICAgICAgICB0aGlzLm90aGVyTGF5ZXJzLnB1c2goaW1hZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbWFnZXMoKSA6QXJyYXk8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdGhlckxheWVycy5sZW5ndGggPyB0aGlzLm90aGVyTGF5ZXJzIDogbnVsbDtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RpbGUudHMiLCJleHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIG5vZGU6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX2ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBzdGF0ZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvciAoc291cmNlOiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnN0YXRlID0gMDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgdGhpcy5faW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5faW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzb3VyY2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkICgpIDp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gMTtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ3RvcCcsICctMTAwMDBweCddLFxuICAgICAgICAgICAgICAgIFsnbGVmdCcsICctMTAwMDBweCddLFxuICAgICAgICAgICAgICAgIFsnd2lkdGgnLCAnMXB4J10sXG4gICAgICAgICAgICAgICAgWydoZWlnaHQnLCAnMXB4J10sXG4gICAgICAgICAgICAgICAgWydwb3NpdGlvbicsICdhYnNvbHV0ZSddLFxuICAgICAgICAgICAgICAgIFsnb3ZlcmZsb3cnLCAnaGlkZGVuJ11cbiAgICAgICAgICAgIF0uZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt2WzBdXSA9IHZbMV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuX2ltYWdlKTtcblxuICAgICAgICAgICAgdGhpcy5faW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmltYWdlLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuaW1hZ2Uub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5faW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAzO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB3aWR0aCgpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBoZWlnaHQoKSA6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGltYWdlKCkgOkhUTUxJbWFnZUVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbWFnZS1sb2FkZXIudHMiLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xuICAgIHB1YmxpYyB5OiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xuICAgIHByaXZhdGUgeDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHk6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBkeDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGR5OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgY2FtZXJhV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGNhbWVyYUhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFwV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIG1hcEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgdGlsZVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSB0aWxlSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB0aW1lcjogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIGlzTW92aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBkcmF3OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgYW5pbWF0aW9uRW5kOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgc3RlcDogbnVtYmVyID0gMC40O1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBjYW1lcmFXaWR0aDogbnVtYmVyLFxuICAgICAgICBjYW1lcmFIZWlnaHQ6IG51bWJlcixcbiAgICAgICAgbWFwV2lkdGg6IG51bWJlcixcbiAgICAgICAgbWFwSGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIHRpbGVXaWR0aDogbnVtYmVyLFxuICAgICAgICB0aWxlSGVpZ2h0OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgdGhpcy5jYW1lcmFXaWR0aCA9IGNhbWVyYVdpZHRoO1xuICAgICAgICB0aGlzLmNhbWVyYUhlaWdodCA9IGNhbWVyYUhlaWdodDtcbiAgICAgICAgdGhpcy5tYXBXaWR0aCA9IG1hcFdpZHRoO1xuICAgICAgICB0aGlzLm1hcEhlaWdodCA9IG1hcEhlaWdodDtcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aWxlV2lkdGg7XG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbmRleCh2YWx1ZTogbnVtYmVyLCBzaXplOiBudW1iZXIpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLmFicyh2YWx1ZSkgLyBzaXplKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGlsZXMoKSA6QXJyYXk8UG9pbnQ+IHtcbiAgICAgICAgbGV0IGFycjogQXJyYXk8UG9pbnQ+ID0gW107XG4gICAgICAgIGxldCB0dyA9IHRoaXMudGlsZVdpZHRoO1xuICAgICAgICBsZXQgdGggPSB0aGlzLnRpbGVIZWlnaHQ7XG4gICAgICAgIGxldCBpbmRleFg6IG51bWJlciA9IHRoaXMuZ2V0SW5kZXgodGhpcy5keCAqICgtMSksIHR3KTtcbiAgICAgICAgbGV0IGluZGV4WTogbnVtYmVyID0gdGhpcy5nZXRJbmRleCh0aGlzLmR5ICogKC0xKSwgdGgpO1xuICAgICAgICBsZXQgc3RhcnRYID0gaW5kZXhYICogdHc7XG4gICAgICAgIGxldCBzdGFydFkgPSBpbmRleFkgKiB0aDtcbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRYID0gTWF0aC5hYnModGhpcy5keCk7XG4gICAgICAgIGxldCBub3JtYWxpemVkWSA9IE1hdGguYWJzKHRoaXMuZHkpO1xuXG4gICAgICAgIGZvciAobGV0IF95ID0gc3RhcnRZOyBfeSA8IG5vcm1hbGl6ZWRZICsgdGhpcy5jYW1lcmFIZWlnaHQ7IF95ICs9IHRoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBfeCA9IHN0YXJ0WDsgX3ggPCBub3JtYWxpemVkWCArIHRoaXMuY2FtZXJhV2lkdGg7IF94ICs9IHR3KSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobmV3IFBvaW50KHRoaXMuZ2V0SW5kZXgoX3gsIHR3KSwgdGhpcy5nZXRJbmRleChfeSwgdGgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgWCgpIDpudW1iZXIgeyByZXR1cm4gdGhpcy5keCB9XG4gICAgcHVibGljIGdldCBZKCkgOm51bWJlciB7IHJldHVybiB0aGlzLmR5IH1cblxuICAgIHB1YmxpYyByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5jYW1lcmFXaWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbWVyYUhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLmNvcnJlY3RQb3NpdGlvbih0aGlzLngsIHRoaXMuY2FtZXJhV2lkdGggLSB0aGlzLm1hcFdpZHRoKTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5jb3JyZWN0UG9zaXRpb24odGhpcy55LCB0aGlzLmNhbWVyYUhlaWdodCAtIHRoaXMubWFwSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvcnJlY3RNaW5Qb3NpdGlvbih2YWx1ZTogbnVtYmVyKSA6bnVtYmVyIHtcbiAgICAgICAgaWYgKHZhbHVlID4gMCkgeyB2YWx1ZSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29ycmVjdFBvc2l0aW9uKHZhbHVlIDpudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpIDpudW1iZXIge1xuICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICB2YWx1ZSA9IHRoaXMuY29ycmVjdE1pblBvc2l0aW9uKHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlIDwgbWF4VmFsdWUpIHsgdmFsdWUgPSBtYXhWYWx1ZTsgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhbmltYXRpb24oKSA6dm9pZCB7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuXG4gICAgICAgIGxldCBkeCA9ICh0aGlzLnggLSB0aGlzLmR4KSAqIHRoaXMuc3RlcDtcbiAgICAgICAgbGV0IGR5ID0gKHRoaXMueSAtIHRoaXMuZHkpICogdGhpcy5zdGVwO1xuXG4gICAgICAgIGR4ID0gTWF0aC5mbG9vcihkeCk7XG4gICAgICAgIGR5ID0gTWF0aC5mbG9vcihkeSk7XG5cbiAgICAgICAgdGhpcy5keCArPSBkeDtcbiAgICAgICAgdGhpcy5keSArPSBkeTtcblxuICAgICAgICB0aGlzLmRyYXcubmV4dCgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZHgpIDwgMC4wMDEgJiYgTWF0aC5hYnMoZHkpIDwgMC4wMDEpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmQubmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5hbmltYXRpb24oKTsgfSwgMzApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZHJhd0V2ZW50KCkgOlN1YmplY3Q8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYXc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhbmltYXRpb25FbmRFdmVudCgpIDpTdWJqZWN0PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRpb25FbmQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3AoKSA6dm9pZCB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy5keCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5keSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcikgOnZvaWQge1xuICAgICAgICB0aGlzLnggPSB0aGlzLmNvcnJlY3RQb3NpdGlvbih0aGlzLnggKyB4LCB0aGlzLmNhbWVyYVdpZHRoIC0gdGhpcy5tYXBXaWR0aCk7XG4gICAgICAgIHRoaXMueSA9IHRoaXMuY29ycmVjdFBvc2l0aW9uKHRoaXMueSArIHksIHRoaXMuY2FtZXJhSGVpZ2h0IC0gdGhpcy5tYXBIZWlnaHQpO1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHsgdGhpcy5hbmltYXRpb24oKTsgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGluZGV4WDogbnVtYmVyLCBpbmRleFk6IG51bWJlcikgOnZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YXJ0UG9zaXRpb24oaW5kZXhYLCBpbmRleFksIHRydWUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHsgdGhpcy5hbmltYXRpb24oKTsgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdGFydFBvc2l0aW9uKGluZGV4WDogbnVtYmVyLCBpbmRleFk6IG51bWJlciwgYW5pbWF0aW9uOiBib29sZWFuID0gZmFsc2UpIDp2b2lkIHtcbiAgICAgICAgbGV0IHggPSAoMCAtIGluZGV4WCAqIHRoaXMudGlsZVdpZHRoKSArIHRoaXMuY2FtZXJhV2lkdGggLyAyIC0gdGhpcy50aWxlV2lkdGggLyAyO1xuICAgICAgICBsZXQgeSA9ICgwIC0gaW5kZXhZICogdGhpcy50aWxlSGVpZ2h0KSArIHRoaXMuY2FtZXJhSGVpZ2h0IC8gMiAtIHRoaXMudGlsZUhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMueCA9IHRoaXMuY29ycmVjdFBvc2l0aW9uKHgsIHRoaXMuY2FtZXJhV2lkdGggLSB0aGlzLm1hcFdpZHRoKTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5jb3JyZWN0UG9zaXRpb24oeSwgdGhpcy5jYW1lcmFIZWlnaHQgLSB0aGlzLm1hcEhlaWdodCk7XG5cbiAgICAgICAgaWYgKCFhbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZHggPSB0aGlzLng7XG4gICAgICAgICAgICB0aGlzLmR5ID0gdGhpcy55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEluZGV4T2ZUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyKSA6UG9pbnQge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMuZ2V0SW5kZXgodGhpcy54ICogKC0xKSArIHgsIHRoaXMudGlsZVdpZHRoKSwgdGhpcy5nZXRJbmRleCh0aGlzLnkgKiAoLTEpICsgeSwgdGhpcy50aWxlSGVpZ2h0KSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NhbWVyYS50cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QTs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZRQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN2S0E7QUFBQTs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQThCQTtBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFsWkE7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN2Q0E7QUFjQTtBQUpBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQXhFQTs7Ozs7Ozs7OztBQ0FBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBbEVBOzs7Ozs7Ozs7O0FDQUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQVBBO0FBU0E7QUFpQkE7QUFoQkE7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTs7O0FBQUE7QUFDQTtBQUFBOzs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQTlJQTs7OztBIiwic291cmNlUm9vdCI6IiJ9
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZW1hcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMmM4NzM5NzE2N2YyODhkNjk3NCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL2Vycm9yT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL1N1YnNjcmlwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdHJ5Q2F0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvT2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvU3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlsZW1hcC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9vYnNlcnZhYmxlL2RvbS9hamF4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvZG9tL0FqYXhPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC90b1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3N5bWJvbC9vYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvcGlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL25vb3AuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvb3BlcmF0b3JzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL1N1YmplY3RTdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlLWxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FtZXJhLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMmM4NzM5NzE2N2YyODhkNjk3NCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29tbW9uSlMgLyBOb2RlIGhhdmUgZ2xvYmFsIGNvbnRleHQgZXhwb3NlZCBhcyBcImdsb2JhbFwiIHZhcmlhYmxlLlxuLy8gV2UgZG9uJ3Qgd2FudCB0byBpbmNsdWRlIHRoZSB3aG9sZSBub2RlLmQudHMgdGhpcyB0aGlzIGNvbXBpbGF0aW9uIHVuaXQgc28gd2UnbGwganVzdCBmYWtlXG4vLyB0aGUgZ2xvYmFsIFwiZ2xvYmFsXCIgdmFyIGZvciBub3cuXG52YXIgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG52YXIgX19zZWxmID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiYgc2VsZjtcbnZhciBfX2dsb2JhbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbDtcbnZhciBfcm9vdCA9IF9fd2luZG93IHx8IF9fZ2xvYmFsIHx8IF9fc2VsZjtcbmV4cG9ydHMucm9vdCA9IF9yb290O1xuLy8gV29ya2Fyb3VuZCBDbG9zdXJlIENvbXBpbGVyIHJlc3RyaWN0aW9uOiBUaGUgYm9keSBvZiBhIGdvb2cubW9kdWxlIGNhbm5vdCB1c2UgdGhyb3cuXG4vLyBUaGlzIGlzIG5lZWRlZCB3aGVuIHVzZWQgd2l0aCBhbmd1bGFyL3RzaWNrbGUgd2hpY2ggaW5zZXJ0cyBhIGdvb2cubW9kdWxlIHN0YXRlbWVudC5cbi8vIFdyYXAgaW4gSUlGRVxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIV9yb290KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUnhKUyBjb3VsZCBub3QgZmluZCBhbnkgZ2xvYmFsIGNvbnRleHQgKHdpbmRvdywgc2VsZiwgZ2xvYmFsKScpO1xuICAgIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb290LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9yb290LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZSgnLi91dGlsL2lzRnVuY3Rpb24nKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4vU3Vic2NyaXB0aW9uJyk7XG52YXIgT2JzZXJ2ZXJfMSA9IHJlcXVpcmUoJy4vT2JzZXJ2ZXInKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vc3ltYm9sL3J4U3Vic2NyaWJlcicpO1xuLyoqXG4gKiBJbXBsZW1lbnRzIHRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGludGVyZmFjZSBhbmQgZXh0ZW5kcyB0aGVcbiAqIHtAbGluayBTdWJzY3JpcHRpb259IGNsYXNzLiBXaGlsZSB0aGUge0BsaW5rIE9ic2VydmVyfSBpcyB0aGUgcHVibGljIEFQSSBmb3JcbiAqIGNvbnN1bWluZyB0aGUgdmFsdWVzIG9mIGFuIHtAbGluayBPYnNlcnZhYmxlfSwgYWxsIE9ic2VydmVycyBnZXQgY29udmVydGVkIHRvXG4gKiBhIFN1YnNjcmliZXIsIGluIG9yZGVyIHRvIHByb3ZpZGUgU3Vic2NyaXB0aW9uLWxpa2UgY2FwYWJpbGl0aWVzIHN1Y2ggYXNcbiAqIGB1bnN1YnNjcmliZWAuIFN1YnNjcmliZXIgaXMgYSBjb21tb24gdHlwZSBpbiBSeEpTLCBhbmQgY3J1Y2lhbCBmb3JcbiAqIGltcGxlbWVudGluZyBvcGVyYXRvcnMsIGJ1dCBpdCBpcyByYXJlbHkgdXNlZCBhcyBhIHB1YmxpYyBBUEkuXG4gKlxuICogQGNsYXNzIFN1YnNjcmliZXI8VD5cbiAqL1xudmFyIFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JzZXJ2ZXJ8ZnVuY3Rpb24odmFsdWU6IFQpOiB2b2lkfSBbZGVzdGluYXRpb25Pck5leHRdIEEgcGFydGlhbGx5XG4gICAgICogZGVmaW5lZCBPYnNlcnZlciBvciBhIGBuZXh0YCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKGU6ID9hbnkpOiB2b2lkfSBbZXJyb3JdIFRoZSBgZXJyb3JgIGNhbGxiYWNrIG9mIGFuXG4gICAgICogT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbY29tcGxldGVdIFRoZSBgY29tcGxldGVgIGNhbGxiYWNrIG9mIGFuXG4gICAgICogT2JzZXJ2ZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU3Vic2NyaWJlcihkZXN0aW5hdGlvbk9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IE9ic2VydmVyXzEuZW1wdHk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKCFkZXN0aW5hdGlvbk9yTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gT2JzZXJ2ZXJfMS5lbXB0eTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzdGluYXRpb25Pck5leHQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbk9yTmV4dCBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbk9yTmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uYWRkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcih0aGlzLCBkZXN0aW5hdGlvbk9yTmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcih0aGlzLCBkZXN0aW5hdGlvbk9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZVtyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAvKipcbiAgICAgKiBBIHN0YXRpYyBmYWN0b3J5IGZvciBhIFN1YnNjcmliZXIsIGdpdmVuIGEgKHBvdGVudGlhbGx5IHBhcnRpYWwpIGRlZmluaXRpb25cbiAgICAgKiBvZiBhbiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHg6ID9UKTogdm9pZH0gW25leHRdIFRoZSBgbmV4dGAgY2FsbGJhY2sgb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmliZXI8VD59IEEgU3Vic2NyaWJlciB3cmFwcGluZyB0aGUgKHBhcnRpYWxseSBkZWZpbmVkKVxuICAgICAqIE9ic2VydmVyIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gICAgICovXG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgbmV4dGAgZnJvbVxuICAgICAqIHRoZSBPYnNlcnZhYmxlLCB3aXRoIGEgdmFsdWUuIFRoZSBPYnNlcnZhYmxlIG1heSBjYWxsIHRoaXMgbWV0aG9kIDAgb3IgbW9yZVxuICAgICAqIHRpbWVzLlxuICAgICAqIEBwYXJhbSB7VH0gW3ZhbHVlXSBUaGUgYG5leHRgIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYGVycm9yYCBmcm9tXG4gICAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYW4gYXR0YWNoZWQge0BsaW5rIEVycm9yfS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXRcbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSBoYXMgZXhwZXJpZW5jZWQgYW4gZXJyb3IgY29uZGl0aW9uLlxuICAgICAqIEBwYXJhbSB7YW55fSBbZXJyXSBUaGUgYGVycm9yYCBleGNlcHRpb24uXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhIHZhbHVlbGVzcyBub3RpZmljYXRpb24gb2YgdHlwZVxuICAgICAqIGBjb21wbGV0ZWAgZnJvbSB0aGUgT2JzZXJ2YWJsZS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXQgdGhlIE9ic2VydmFibGVcbiAgICAgKiBoYXMgZmluaXNoZWQgc2VuZGluZyBwdXNoLWJhc2VkIG5vdGlmaWNhdGlvbnMuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudCA9IF9hLl9wYXJlbnQsIF9wYXJlbnRzID0gX2EuX3BhcmVudHM7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IF9wYXJlbnQ7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBfcGFyZW50cztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gU3Vic2NyaWJlcjtcbn0oU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKSk7XG5leHBvcnRzLlN1YnNjcmliZXIgPSBTdWJzY3JpYmVyO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKF9wYXJlbnRTdWJzY3JpYmVyLCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0Lm5leHQ7XG4gICAgICAgICAgICBlcnJvciA9IG9ic2VydmVyT3JOZXh0LmVycm9yO1xuICAgICAgICAgICAgY29tcGxldGUgPSBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlck9yTmV4dCAhPT0gT2JzZXJ2ZXJfMS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oY29udGV4dC51bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoY29udGV4dC51bnN1YnNjcmliZS5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC51bnN1YnNjcmliZSA9IHRoaXMudW5zdWJzY3JpYmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5fbmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlID0gY29tcGxldGU7XG4gICAgfVxuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQgJiYgdGhpcy5fbmV4dCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fbmV4dCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHRoaXMuX25leHQsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICAgICAgX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fY29tcGxldGUuY2FsbChfdGhpcy5fY29udGV4dCk7IH07XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIod3JhcHBlZENvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yVW5zdWIgPSBmdW5jdGlvbiAoZm4sIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yU2V0RXJyb3IgPSBmdW5jdGlvbiAocGFyZW50LCBmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICBfcGFyZW50U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIFNhZmVTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIHR5cGVvZiBhbnkgc28gdGhhdCBpdCB3ZSBkb24ndCBoYXZlIHRvIGNhc3Qgd2hlbiBjb21wYXJpbmcgYSByZXN1bHQgdG8gdGhlIGVycm9yIG9iamVjdFxuZXhwb3J0cy5lcnJvck9iamVjdCA9IHsgZToge30gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yT2JqZWN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9lcnJvck9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpc0FycmF5XzEgPSByZXF1aXJlKCcuL3V0aWwvaXNBcnJheScpO1xudmFyIGlzT2JqZWN0XzEgPSByZXF1aXJlKCcuL3V0aWwvaXNPYmplY3QnKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKCcuL3V0aWwvaXNGdW5jdGlvbicpO1xudmFyIHRyeUNhdGNoXzEgPSByZXF1aXJlKCcuL3V0aWwvdHJ5Q2F0Y2gnKTtcbnZhciBlcnJvck9iamVjdF8xID0gcmVxdWlyZSgnLi91dGlsL2Vycm9yT2JqZWN0Jyk7XG52YXIgVW5zdWJzY3JpcHRpb25FcnJvcl8xID0gcmVxdWlyZSgnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InKTtcbi8qKlxuICogUmVwcmVzZW50cyBhIGRpc3Bvc2FibGUgcmVzb3VyY2UsIHN1Y2ggYXMgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLiBBXG4gKiBTdWJzY3JpcHRpb24gaGFzIG9uZSBpbXBvcnRhbnQgbWV0aG9kLCBgdW5zdWJzY3JpYmVgLCB0aGF0IHRha2VzIG5vIGFyZ3VtZW50XG4gKiBhbmQganVzdCBkaXNwb3NlcyB0aGUgcmVzb3VyY2UgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgc3Vic2NyaXB0aW9ucyBtYXkgYmUgZ3JvdXBlZCB0b2dldGhlciB0aHJvdWdoIHRoZSBgYWRkKClgXG4gKiBtZXRob2QsIHdoaWNoIHdpbGwgYXR0YWNoIGEgY2hpbGQgU3Vic2NyaXB0aW9uIHRvIHRoZSBjdXJyZW50IFN1YnNjcmlwdGlvbi5cbiAqIFdoZW4gYSBTdWJzY3JpcHRpb24gaXMgdW5zdWJzY3JpYmVkLCBhbGwgaXRzIGNoaWxkcmVuIChhbmQgaXRzIGdyYW5kY2hpbGRyZW4pXG4gKiB3aWxsIGJlIHVuc3Vic2NyaWJlZCBhcyB3ZWxsLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25cbiAqL1xudmFyIFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbdW5zdWJzY3JpYmVdIEEgZnVuY3Rpb24gZGVzY3JpYmluZyBob3cgdG9cbiAgICAgKiBwZXJmb3JtIHRoZSBkaXNwb3NhbCBvZiByZXNvdXJjZXMgd2hlbiB0aGUgYHVuc3Vic2NyaWJlYCBtZXRob2QgaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbih1bnN1YnNjcmliZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhpcyBTdWJzY3JpcHRpb24gaGFzIGFscmVhZHkgYmVlbiB1bnN1YnNjcmliZWQuXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uIE1heSwgZm9yIGluc3RhbmNlLCBjYW5jZWxcbiAgICAgKiBhbiBvbmdvaW5nIE9ic2VydmFibGUgZXhlY3V0aW9uIG9yIGNhbmNlbCBhbnkgb3RoZXIgdHlwZSBvZiB3b3JrIHRoYXRcbiAgICAgKiBzdGFydGVkIHdoZW4gdGhlIFN1YnNjcmlwdGlvbiB3YXMgY3JlYXRlZC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoYXNFcnJvcnMgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudCA9IF9hLl9wYXJlbnQsIF9wYXJlbnRzID0gX2EuX3BhcmVudHMsIF91bnN1YnNjcmliZSA9IF9hLl91bnN1YnNjcmliZSwgX3N1YnNjcmlwdGlvbnMgPSBfYS5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgLy8gbnVsbCBvdXQgX3N1YnNjcmlwdGlvbnMgZmlyc3Qgc28gYW55IGNoaWxkIHN1YnNjcmlwdGlvbnMgdGhhdCBhdHRlbXB0XG4gICAgICAgIC8vIHRvIHJlbW92ZSB0aGVtc2VsdmVzIGZyb20gdGhpcyBzdWJzY3JpcHRpb24gd2lsbCBub29wXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgdmFyIGxlbiA9IF9wYXJlbnRzID8gX3BhcmVudHMubGVuZ3RoIDogMDtcbiAgICAgICAgLy8gaWYgdGhpcy5fcGFyZW50IGlzIG51bGwsIHRoZW4gc28gaXMgdGhpcy5fcGFyZW50cywgYW5kIHdlXG4gICAgICAgIC8vIGRvbid0IGhhdmUgdG8gcmVtb3ZlIG91cnNlbHZlcyBmcm9tIGFueSBwYXJlbnQgc3Vic2NyaXB0aW9ucy5cbiAgICAgICAgd2hpbGUgKF9wYXJlbnQpIHtcbiAgICAgICAgICAgIF9wYXJlbnQucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgLy8gaWYgdGhpcy5fcGFyZW50cyBpcyBudWxsIG9yIGluZGV4ID49IGxlbixcbiAgICAgICAgICAgIC8vIHRoZW4gX3BhcmVudCBpcyBzZXQgdG8gbnVsbCwgYW5kIHRoZSBsb29wIGV4aXRzXG4gICAgICAgICAgICBfcGFyZW50ID0gKytpbmRleCA8IGxlbiAmJiBfcGFyZW50c1tpbmRleF0gfHwgbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oX3Vuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgdmFyIHRyaWFsID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaChfdW5zdWJzY3JpYmUpLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyB8fCAoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IgP1xuICAgICAgICAgICAgICAgICAgICBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lLmVycm9ycykgOiBbZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlfMS5pc0FycmF5KF9zdWJzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGxlbiA9IF9zdWJzY3JpcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3RfMS5pc09iamVjdChzdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmlhbCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goc3ViLnVuc3Vic2NyaWJlKS5jYWxsKHN1Yik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGEgdGVhciBkb3duIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlKCkgb2YgdGhpc1xuICAgICAqIFN1YnNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSB0ZWFyIGRvd24gYmVpbmcgYWRkZWQgaXMgYSBzdWJzY3JpcHRpb24gdGhhdCBpcyBhbHJlYWR5XG4gICAgICogdW5zdWJzY3JpYmVkLCBpcyB0aGUgc2FtZSByZWZlcmVuY2UgYGFkZGAgaXMgYmVpbmcgY2FsbGVkIG9uLCBvciBpc1xuICAgICAqIGBTdWJzY3JpcHRpb24uRU1QVFlgLCBpdCB3aWxsIG5vdCBiZSBhZGRlZC5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgc3Vic2NyaXB0aW9uIGlzIGFscmVhZHkgaW4gYW4gYGNsb3NlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICAgKiB0ZWFyIGRvd24gbG9naWMgd2lsbCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgICAqIHRlYXJkb3duLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmlwdGlvbn0gUmV0dXJucyB0aGUgU3Vic2NyaXB0aW9uIHVzZWQgb3IgY3JlYXRlZCB0byBiZVxuICAgICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICAgKiBgcmVtb3ZlKClgIHRvIHJlbW92ZSB0aGUgcGFzc2VkIHRlYXJkb3duIGxvZ2ljIGZyb20gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnNcbiAgICAgKiBsaXN0LlxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRlYXJkb3duO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGVhcmRvd24pO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmNsb3NlZCB8fCB0eXBlb2Ygc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc3Vic2NyaXB0aW9uLl9hZGRQYXJlbnQgIT09ICdmdW5jdGlvbicgLyogcXVhY2sgcXVhY2sgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uX3N1YnNjcmlwdGlvbnMgPSBbdG1wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRlYXJkb3duICcgKyB0ZWFyZG93biArICcgYWRkZWQgdG8gU3Vic2NyaXB0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucyB8fCAodGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdKTtcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5fYWRkUGFyZW50KHRoaXMpO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIFN1YnNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbCBsaXN0IG9mIHN1YnNjcmlwdGlvbnMgdGhhdCB3aWxsXG4gICAgICogdW5zdWJzY3JpYmUgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSBwcm9jZXNzIG9mIHRoaXMgU3Vic2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gVGhlIHN1YnNjcmlwdGlvbiB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbkluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5zcGxpY2Uoc3Vic2NyaXB0aW9uSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9hZGRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzO1xuICAgICAgICBpZiAoIV9wYXJlbnQgfHwgX3BhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgcGFyZW50LCBvciB0aGUgbmV3IHBhcmVudCBpcyB0aGUgc2FtZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgcGFyZW50LCB0aGVuIHNldCB0aGlzLl9wYXJlbnQgdG8gdGhlIG5ldyBwYXJlbnQuXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIV9wYXJlbnRzKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGFscmVhZHkgb25lIHBhcmVudCwgYnV0IG5vdCBtdWx0aXBsZSwgYWxsb2NhdGUgYW4gQXJyYXkgdG9cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSByZXN0IG9mIHRoZSBwYXJlbnQgU3Vic2NyaXB0aW9ucy5cbiAgICAgICAgICAgIHRoaXMuX3BhcmVudHMgPSBbcGFyZW50XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50cy5pbmRleE9mKHBhcmVudCkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFkZCB0aGUgbmV3IHBhcmVudCB0byB0aGUgX3BhcmVudHMgbGlzdCBpZiBpdCdzIG5vdCBhbHJlYWR5IHRoZXJlLlxuICAgICAgICAgICAgX3BhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKGVtcHR5KSB7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KG5ldyBTdWJzY3JpcHRpb24oKSkpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0cy5TdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb247XG5mdW5jdGlvbiBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JzKSB7XG4gICAgcmV0dXJuIGVycm9ycy5yZWR1Y2UoZnVuY3Rpb24gKGVycnMsIGVycikgeyByZXR1cm4gZXJycy5jb25jYXQoKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSA/IGVyci5lcnJvcnMgOiBlcnIpOyB9LCBbXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG52YXIgU3ltYm9sID0gcm9vdF8xLnJvb3QuU3ltYm9sO1xuZXhwb3J0cy5yeFN1YnNjcmliZXIgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLmZvciA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIFN5bWJvbC5mb3IoJ3J4U3Vic2NyaWJlcicpIDogJ0BAcnhTdWJzY3JpYmVyJztcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIHJ4U3Vic2NyaWJlciBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRyeFN1YnNjcmliZXIgPSBleHBvcnRzLnJ4U3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ4U3Vic2NyaWJlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3N5bWJvbC9yeFN1YnNjcmliZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZXJyb3JPYmplY3RfMSA9IHJlcXVpcmUoJy4vZXJyb3JPYmplY3QnKTtcbnZhciB0cnlDYXRjaFRhcmdldDtcbmZ1bmN0aW9uIHRyeUNhdGNoZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRyeUNhdGNoVGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSA9IGU7XG4gICAgICAgIHJldHVybiBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyeUNhdGNoKGZuKSB7XG4gICAgdHJ5Q2F0Y2hUYXJnZXQgPSBmbjtcbiAgICByZXR1cm4gdHJ5Q2F0Y2hlcjtcbn1cbmV4cG9ydHMudHJ5Q2F0Y2ggPSB0cnlDYXRjaDtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyeUNhdGNoLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC90cnlDYXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuL3V0aWwvcm9vdCcpO1xudmFyIHRvU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi91dGlsL3RvU3Vic2NyaWJlcicpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vc3ltYm9sL29ic2VydmFibGUnKTtcbnZhciBwaXBlXzEgPSByZXF1aXJlKCcuL3V0aWwvcGlwZScpO1xuLyoqXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIGFueSBzZXQgb2YgdmFsdWVzIG92ZXIgYW55IGFtb3VudCBvZiB0aW1lLiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIGJ1aWxkaW5nIGJsb2NrXG4gKiBvZiBSeEpTLlxuICpcbiAqIEBjbGFzcyBPYnNlcnZhYmxlPFQ+XG4gKi9cbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmUgdGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIE9ic2VydmFibGUgaXNcbiAgICAgKiBpbml0aWFsbHkgc3Vic2NyaWJlZCB0by4gVGhpcyBmdW5jdGlvbiBpcyBnaXZlbiBhIFN1YnNjcmliZXIsIHRvIHdoaWNoIG5ldyB2YWx1ZXNcbiAgICAgKiBjYW4gYmUgYG5leHRgZWQsIG9yIGFuIGBlcnJvcmAgbWV0aG9kIGNhbiBiZSBjYWxsZWQgdG8gcmFpc2UgYW4gZXJyb3IsIG9yXG4gICAgICogYGNvbXBsZXRlYCBjYW4gYmUgY2FsbGVkIHRvIG5vdGlmeSBvZiBhIHN1Y2Nlc3NmdWwgY29tcGxldGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IGZhbHNlO1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBPYnNlcnZhYmxlLCB3aXRoIHRoaXMgT2JzZXJ2YWJsZSBhcyB0aGUgc291cmNlLCBhbmQgdGhlIHBhc3NlZFxuICAgICAqIG9wZXJhdG9yIGRlZmluZWQgYXMgdGhlIG5ldyBvYnNlcnZhYmxlJ3Mgb3BlcmF0b3IuXG4gICAgICogQG1ldGhvZCBsaWZ0XG4gICAgICogQHBhcmFtIHtPcGVyYXRvcn0gb3BlcmF0b3IgdGhlIG9wZXJhdG9yIGRlZmluaW5nIHRoZSBvcGVyYXRpb24gdG8gdGFrZSBvbiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IG9ic2VydmFibGUgd2l0aCB0aGUgT3BlcmF0b3IgYXBwbGllZFxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIG9ic2VydmFibGUub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnZva2VzIGFuIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlIGFuZCByZWdpc3RlcnMgT2JzZXJ2ZXIgaGFuZGxlcnMgZm9yIG5vdGlmaWNhdGlvbnMgaXQgd2lsbCBlbWl0LlxuICAgICAqXG4gICAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlVzZSBpdCB3aGVuIHlvdSBoYXZlIGFsbCB0aGVzZSBPYnNlcnZhYmxlcywgYnV0IHN0aWxsIG5vdGhpbmcgaXMgaGFwcGVuaW5nLjwvc3Bhbj5cbiAgICAgKlxuICAgICAqIGBzdWJzY3JpYmVgIGlzIG5vdCBhIHJlZ3VsYXIgb3BlcmF0b3IsIGJ1dCBhIG1ldGhvZCB0aGF0IGNhbGxzIE9ic2VydmFibGUncyBpbnRlcm5hbCBgc3Vic2NyaWJlYCBmdW5jdGlvbi4gSXRcbiAgICAgKiBtaWdodCBiZSBmb3IgZXhhbXBsZSBhIGZ1bmN0aW9uIHRoYXQgeW91IHBhc3NlZCB0byBhIHtAbGluayBjcmVhdGV9IHN0YXRpYyBmYWN0b3J5LCBidXQgbW9zdCBvZiB0aGUgdGltZSBpdCBpc1xuICAgICAqIGEgbGlicmFyeSBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggZGVmaW5lcyB3aGF0IGFuZCB3aGVuIHdpbGwgYmUgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlLiBUaGlzIG1lYW5zIHRoYXQgY2FsbGluZ1xuICAgICAqIGBzdWJzY3JpYmVgIGlzIGFjdHVhbGx5IHRoZSBtb21lbnQgd2hlbiBPYnNlcnZhYmxlIHN0YXJ0cyBpdHMgd29yaywgbm90IHdoZW4gaXQgaXMgY3JlYXRlZCwgYXMgaXQgaXMgb2Z0ZW5cbiAgICAgKiB0aG91Z2h0LlxuICAgICAqXG4gICAgICogQXBhcnQgZnJvbSBzdGFydGluZyB0aGUgZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUsIHRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gbGlzdGVuIGZvciB2YWx1ZXNcbiAgICAgKiB0aGF0IGFuIE9ic2VydmFibGUgZW1pdHMsIGFzIHdlbGwgYXMgZm9yIHdoZW4gaXQgY29tcGxldGVzIG9yIGVycm9ycy4gWW91IGNhbiBhY2hpZXZlIHRoaXMgaW4gdHdvXG4gICAgICogZm9sbG93aW5nIHdheXMuXG4gICAgICpcbiAgICAgKiBUaGUgZmlyc3Qgd2F5IGlzIGNyZWF0aW5nIGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UuIEl0IHNob3VsZCBoYXZlIG1ldGhvZHNcbiAgICAgKiBkZWZpbmVkIGJ5IHRoYXQgaW50ZXJmYWNlLCBidXQgbm90ZSB0aGF0IGl0IHNob3VsZCBiZSBqdXN0IGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCwgd2hpY2ggeW91IGNhbiBjcmVhdGVcbiAgICAgKiB5b3Vyc2VsZiBpbiBhbnkgd2F5IHlvdSB3YW50IChFUzYgY2xhc3MsIGNsYXNzaWMgZnVuY3Rpb24gY29uc3RydWN0b3IsIG9iamVjdCBsaXRlcmFsIGV0Yy4pLiBJbiBwYXJ0aWN1bGFyIGRvXG4gICAgICogbm90IGF0dGVtcHQgdG8gdXNlIGFueSBSeEpTIGltcGxlbWVudGF0aW9uIGRldGFpbHMgdG8gY3JlYXRlIE9ic2VydmVycyAtIHlvdSBkb24ndCBuZWVkIHRoZW0uIFJlbWVtYmVyIGFsc29cbiAgICAgKiB0aGF0IHlvdXIgb2JqZWN0IGRvZXMgbm90IGhhdmUgdG8gaW1wbGVtZW50IGFsbCBtZXRob2RzLiBJZiB5b3UgZmluZCB5b3Vyc2VsZiBjcmVhdGluZyBhIG1ldGhvZCB0aGF0IGRvZXNuJ3RcbiAgICAgKiBkbyBhbnl0aGluZywgeW91IGNhbiBzaW1wbHkgb21pdCBpdC4gTm90ZSBob3dldmVyLCB0aGF0IGlmIGBlcnJvcmAgbWV0aG9kIGlzIG5vdCBwcm92aWRlZCwgYWxsIGVycm9ycyB3aWxsXG4gICAgICogYmUgbGVmdCB1bmNhdWdodC5cbiAgICAgKlxuICAgICAqIFRoZSBzZWNvbmQgd2F5IGlzIHRvIGdpdmUgdXAgb24gT2JzZXJ2ZXIgb2JqZWN0IGFsdG9nZXRoZXIgYW5kIHNpbXBseSBwcm92aWRlIGNhbGxiYWNrIGZ1bmN0aW9ucyBpbiBwbGFjZSBvZiBpdHMgbWV0aG9kcy5cbiAgICAgKiBUaGlzIG1lYW5zIHlvdSBjYW4gcHJvdmlkZSB0aHJlZSBmdW5jdGlvbnMgYXMgYXJndW1lbnRzIHRvIGBzdWJzY3JpYmVgLCB3aGVyZSBmaXJzdCBmdW5jdGlvbiBpcyBlcXVpdmFsZW50XG4gICAgICogb2YgYSBgbmV4dGAgbWV0aG9kLCBzZWNvbmQgb2YgYW4gYGVycm9yYCBtZXRob2QgYW5kIHRoaXJkIG9mIGEgYGNvbXBsZXRlYCBtZXRob2QuIEp1c3QgYXMgaW4gY2FzZSBvZiBPYnNlcnZlcixcbiAgICAgKiBpZiB5b3UgZG8gbm90IG5lZWQgdG8gbGlzdGVuIGZvciBzb21ldGhpbmcsIHlvdSBjYW4gb21pdCBhIGZ1bmN0aW9uLCBwcmVmZXJhYmx5IGJ5IHBhc3NpbmcgYHVuZGVmaW5lZGAgb3IgYG51bGxgLFxuICAgICAqIHNpbmNlIGBzdWJzY3JpYmVgIHJlY29nbml6ZXMgdGhlc2UgZnVuY3Rpb25zIGJ5IHdoZXJlIHRoZXkgd2VyZSBwbGFjZWQgaW4gZnVuY3Rpb24gY2FsbC4gV2hlbiBpdCBjb21lc1xuICAgICAqIHRvIGBlcnJvcmAgZnVuY3Rpb24sIGp1c3QgYXMgYmVmb3JlLCBpZiBub3QgcHJvdmlkZWQsIGVycm9ycyBlbWl0dGVkIGJ5IGFuIE9ic2VydmFibGUgd2lsbCBiZSB0aHJvd24uXG4gICAgICpcbiAgICAgKiBXaGF0ZXZlciBzdHlsZSBvZiBjYWxsaW5nIGBzdWJzY3JpYmVgIHlvdSB1c2UsIGluIGJvdGggY2FzZXMgaXQgcmV0dXJucyBhIFN1YnNjcmlwdGlvbiBvYmplY3QuXG4gICAgICogVGhpcyBvYmplY3QgYWxsb3dzIHlvdSB0byBjYWxsIGB1bnN1YnNjcmliZWAgb24gaXQsIHdoaWNoIGluIHR1cm4gd2lsbCBzdG9wIHdvcmsgdGhhdCBhbiBPYnNlcnZhYmxlIGRvZXMgYW5kIHdpbGwgY2xlYW5cbiAgICAgKiB1cCBhbGwgcmVzb3VyY2VzIHRoYXQgYW4gT2JzZXJ2YWJsZSB1c2VkLiBOb3RlIHRoYXQgY2FuY2VsbGluZyBhIHN1YnNjcmlwdGlvbiB3aWxsIG5vdCBjYWxsIGBjb21wbGV0ZWAgY2FsbGJhY2tcbiAgICAgKiBwcm92aWRlZCB0byBgc3Vic2NyaWJlYCBmdW5jdGlvbiwgd2hpY2ggaXMgcmVzZXJ2ZWQgZm9yIGEgcmVndWxhciBjb21wbGV0aW9uIHNpZ25hbCB0aGF0IGNvbWVzIGZyb20gYW4gT2JzZXJ2YWJsZS5cbiAgICAgKlxuICAgICAqIFJlbWVtYmVyIHRoYXQgY2FsbGJhY2tzIHByb3ZpZGVkIHRvIGBzdWJzY3JpYmVgIGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSBjYWxsZWQgYXN5bmNocm9ub3VzbHkuXG4gICAgICogSXQgaXMgYW4gT2JzZXJ2YWJsZSBpdHNlbGYgdGhhdCBkZWNpZGVzIHdoZW4gdGhlc2UgZnVuY3Rpb25zIHdpbGwgYmUgY2FsbGVkLiBGb3IgZXhhbXBsZSB7QGxpbmsgb2Z9XG4gICAgICogYnkgZGVmYXVsdCBlbWl0cyBhbGwgaXRzIHZhbHVlcyBzeW5jaHJvbm91c2x5LiBBbHdheXMgY2hlY2sgZG9jdW1lbnRhdGlvbiBmb3IgaG93IGdpdmVuIE9ic2VydmFibGVcbiAgICAgKiB3aWxsIGJlaGF2ZSB3aGVuIHN1YnNjcmliZWQgYW5kIGlmIGl0cyBkZWZhdWx0IGJlaGF2aW9yIGNhbiBiZSBtb2RpZmllZCB3aXRoIGEge0BsaW5rIFNjaGVkdWxlcn0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TdWJzY3JpYmUgd2l0aCBhbiBPYnNlcnZlcjwvY2FwdGlvbj5cbiAgICAgKiBjb25zdCBzdW1PYnNlcnZlciA9IHtcbiAgICAgKiAgIHN1bTogMCxcbiAgICAgKiAgIG5leHQodmFsdWUpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FkZGluZzogJyArIHZhbHVlKTtcbiAgICAgKiAgICAgdGhpcy5zdW0gPSB0aGlzLnN1bSArIHZhbHVlO1xuICAgICAqICAgfSxcbiAgICAgKiAgIGVycm9yKCkgeyAvLyBXZSBhY3R1YWxseSBjb3VsZCBqdXN0IHJlbW92ZSB0aGlzIG1ldGhvZCxcbiAgICAgKiAgIH0sICAgICAgICAvLyBzaW5jZSB3ZSBkbyBub3QgcmVhbGx5IGNhcmUgYWJvdXQgZXJyb3JzIHJpZ2h0IG5vdy5cbiAgICAgKiAgIGNvbXBsZXRlKCkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnU3VtIGVxdWFsczogJyArIHRoaXMuc3VtKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogUnguT2JzZXJ2YWJsZS5vZigxLCAyLCAzKSAvLyBTeW5jaHJvbm91c2x5IGVtaXRzIDEsIDIsIDMgYW5kIHRoZW4gY29tcGxldGVzLlxuICAgICAqIC5zdWJzY3JpYmUoc3VtT2JzZXJ2ZXIpO1xuICAgICAqXG4gICAgICogLy8gTG9nczpcbiAgICAgKiAvLyBcIkFkZGluZzogMVwiXG4gICAgICogLy8gXCJBZGRpbmc6IDJcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAzXCJcbiAgICAgKiAvLyBcIlN1bSBlcXVhbHM6IDZcIlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TdWJzY3JpYmUgd2l0aCBmdW5jdGlvbnM8L2NhcHRpb24+XG4gICAgICogbGV0IHN1bSA9IDA7XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLm9mKDEsIDIsIDMpXG4gICAgICogLnN1YnNjcmliZShcbiAgICAgKiAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBZGRpbmc6ICcgKyB2YWx1ZSk7XG4gICAgICogICAgIHN1bSA9IHN1bSArIHZhbHVlO1xuICAgICAqICAgfSxcbiAgICAgKiAgIHVuZGVmaW5lZCxcbiAgICAgKiAgIGZ1bmN0aW9uKCkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnU3VtIGVxdWFsczogJyArIHN1bSk7XG4gICAgICogICB9XG4gICAgICogKTtcbiAgICAgKlxuICAgICAqIC8vIExvZ3M6XG4gICAgICogLy8gXCJBZGRpbmc6IDFcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAyXCJcbiAgICAgKiAvLyBcIkFkZGluZzogM1wiXG4gICAgICogLy8gXCJTdW0gZXF1YWxzOiA2XCJcbiAgICAgKlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+Q2FuY2VsIGEgc3Vic2NyaXB0aW9uPC9jYXB0aW9uPlxuICAgICAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkuc3Vic2NyaWJlKFxuICAgICAqICAgbnVtID0+IGNvbnNvbGUubG9nKG51bSksXG4gICAgICogICB1bmRlZmluZWQsXG4gICAgICogICAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGVkIScpIC8vIFdpbGwgbm90IGJlIGNhbGxlZCwgZXZlblxuICAgICAqICk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGNhbmNlbGxpbmcgc3Vic2NyaXB0aW9uXG4gICAgICpcbiAgICAgKlxuICAgICAqIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAqICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICogICBjb25zb2xlLmxvZygndW5zdWJzY3JpYmVkIScpO1xuICAgICAqIH0sIDI1MDApO1xuICAgICAqXG4gICAgICogLy8gTG9nczpcbiAgICAgKiAvLyAwIGFmdGVyIDFzXG4gICAgICogLy8gMSBhZnRlciAyc1xuICAgICAqIC8vIFwidW5zdWJzY3JpYmVkIVwiIGFmdGVyIDIuNXNcbiAgICAgKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYnNlcnZlcnxGdW5jdGlvbn0gb2JzZXJ2ZXJPck5leHQgKG9wdGlvbmFsKSBFaXRoZXIgYW4gb2JzZXJ2ZXIgd2l0aCBtZXRob2RzIHRvIGJlIGNhbGxlZCxcbiAgICAgKiAgb3IgdGhlIGZpcnN0IG9mIHRocmVlIHBvc3NpYmxlIGhhbmRsZXJzLCB3aGljaCBpcyB0aGUgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGZyb20gdGhlIHN1YnNjcmliZWRcbiAgICAgKiAgT2JzZXJ2YWJsZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvciAob3B0aW9uYWwpIEEgaGFuZGxlciBmb3IgYSB0ZXJtaW5hbCBldmVudCByZXN1bHRpbmcgZnJvbSBhbiBlcnJvci4gSWYgbm8gZXJyb3IgaGFuZGxlciBpcyBwcm92aWRlZCxcbiAgICAgKiAgdGhlIGVycm9yIHdpbGwgYmUgdGhyb3duIGFzIHVuaGFuZGxlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZSAob3B0aW9uYWwpIEEgaGFuZGxlciBmb3IgYSB0ZXJtaW5hbCBldmVudCByZXN1bHRpbmcgZnJvbSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICogQHJldHVybiB7SVN1YnNjcmlwdGlvbn0gYSBzdWJzY3JpcHRpb24gcmVmZXJlbmNlIHRvIHRoZSByZWdpc3RlcmVkIGhhbmRsZXJzXG4gICAgICogQG1ldGhvZCBzdWJzY3JpYmVcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xuICAgICAgICB2YXIgc2luayA9IHRvU3Vic2NyaWJlcl8xLnRvU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICBvcGVyYXRvci5jYWxsKHNpbmssIHRoaXMuc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbmsuYWRkKHRoaXMuc291cmNlID8gdGhpcy5fc3Vic2NyaWJlKHNpbmspIDogdGhpcy5fdHJ5U3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZm9yRWFjaFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHQgYSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGVcbiAgICAgKiBAcGFyYW0ge1Byb21pc2VDb25zdHJ1Y3Rvcn0gW1Byb21pc2VDdG9yXSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHVzZWQgdG8gaW5zdGFudGlhdGUgdGhlIFByb21pc2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCBlaXRoZXIgcmVzb2x2ZXMgb24gb2JzZXJ2YWJsZSBjb21wbGV0aW9uIG9yXG4gICAgICogIHJlamVjdHMgd2l0aCB0aGUgaGFuZGxlZCBlcnJvclxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgaWYgKHJvb3RfMS5yb290LlJ4ICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZyAmJiByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb290XzEucm9vdC5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gUHJvbWlzZSBpbXBsIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBNdXN0IGJlIGRlY2xhcmVkIGluIGEgc2VwYXJhdGUgc3RhdGVtZW50IHRvIGF2b2lkIGEgUmVmZXJuY2VFcnJvciB3aGVuXG4gICAgICAgICAgICAvLyBhY2Nlc3Npbmcgc3Vic2NyaXB0aW9uIGJlbG93IGluIHRoZSBjbG9zdXJlIGR1ZSB0byBUZW1wb3JhbCBEZWFkIFpvbmUuXG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24sIHRoZW4gd2UgY2FuIHN1cm1pc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5leHQgaGFuZGxpbmcgaXMgYXN5bmNocm9ub3VzLiBBbnkgZXJyb3JzIHRocm93blxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIHJlamVjdGVkIGV4cGxpY2l0bHkgYW5kIHVuc3Vic2NyaWJlIG11c3QgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIG1hbnVhbGx5XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBOTyBzdWJzY3JpcHRpb24sIHRoZW4gd2UncmUgZ2V0dGluZyBhIG5leHRlZFxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZSBzeW5jaHJvbm91c2x5IGR1cmluZyBzdWJzY3JpcHRpb24uIFdlIGNhbiBqdXN0IGNhbGwgaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGVycm9ycywgT2JzZXJ2YWJsZSdzIGBzdWJzY3JpYmVgIHdpbGwgZW5zdXJlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB1bnN1YnNjcmlwdGlvbiBsb2dpYyBpcyBjYWxsZWQsIHRoZW4gc3luY2hyb25vdXNseSByZXRocm93IHRoZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgdGhhdCwgUHJvbWlzZSB3aWxsIHRyYXAgdGhlIGVycm9yIGFuZCBzZW5kIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvd24gdGhlIHJlamVjdGlvbiBwYXRoLlxuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQW4gaW50ZXJvcCBwb2ludCBkZWZpbmVkIGJ5IHRoZSBlczctb2JzZXJ2YWJsZSBzcGVjIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICAgKiBAbWV0aG9kIFN5bWJvbC5vYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhpcyBpbnN0YW5jZSBvZiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc3RpdGNoIHRvZ2V0aGVyIGZ1bmN0aW9uYWwgb3BlcmF0b3JzIGludG8gYSBjaGFpbi5cbiAgICAgKiBAbWV0aG9kIHBpcGVcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSB0aGUgT2JzZXJ2YWJsZSByZXN1bHQgb2YgYWxsIG9mIHRoZSBvcGVyYXRvcnMgaGF2aW5nXG4gICAgICogYmVlbiBjYWxsZWQgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApXG4gICAgICogICAucGlwZShcbiAgICAgKiAgICAgZmlsdGVyKHggPT4geCAlIDIgPT09IDApLFxuICAgICAqICAgICBtYXAoeCA9PiB4ICsgeCksXG4gICAgICogICAgIHNjYW4oKGFjYywgeCkgPT4gYWNjICsgeClcbiAgICAgKiAgIClcbiAgICAgKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSlcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3BlcmF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaXBlXzEucGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKTtcbiAgICB9O1xuICAgIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKFByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIGlmIChyb290XzEucm9vdC5SeCAmJiByb290XzEucm9vdC5SeC5jb25maWcgJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiB2YWx1ZSA9IHg7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gSEFDSzogU2luY2UgVHlwZVNjcmlwdCBpbmhlcml0cyBzdGF0aWMgcHJvcGVydGllcyB0b28sIHdlIGhhdmUgdG9cbiAgICAvLyBmaWdodCBhZ2FpbnN0IFR5cGVTY3JpcHQgaGVyZSBzbyBTdWJqZWN0IGNhbiBoYXZlIGEgZGlmZmVyZW50IHN0YXRpYyBjcmVhdGUgc2lnbmF0dXJlXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb2xkIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmU/IHRoZSBzdWJzY3JpYmVyIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IGNvbGQgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvT2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5lbXB0eSA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHsgdGhyb3cgZXJyOyB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7IH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9PYnNlcnZhYmxlJyk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpYmVyJyk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xudmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEgPSByZXF1aXJlKCcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InKTtcbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YmplY3RTdWJzY3JpcHRpb24nKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vc3ltYm9sL3J4U3Vic2NyaWJlcicpO1xuLyoqXG4gKiBAY2xhc3MgU3ViamVjdFN1YnNjcmliZXI8VD5cbiAqL1xudmFyIFN1YmplY3RTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdFN1YnNjcmliZXIoZGVzdGluYXRpb24pIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgfVxuICAgIHJldHVybiBTdWJqZWN0U3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbmV4cG9ydHMuU3ViamVjdFN1YnNjcmliZXIgPSBTdWJqZWN0U3Vic2NyaWJlcjtcbi8qKlxuICogQGNsYXNzIFN1YmplY3Q8VD5cbiAqL1xudmFyIFN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3QoKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGhyb3duRXJyb3IgPSBudWxsO1xuICAgIH1cbiAgICBTdWJqZWN0LnByb3RvdHlwZVtyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpYmVyKHRoaXMpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBBbm9ueW1vdXNTdWJqZWN0KHRoaXMsIHRoaXMpO1xuICAgICAgICBzdWJqZWN0Lm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgICAgICAgICAgdmFyIGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvcHlbaV0ubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMudGhyb3duRXJyb3IgPSBlcnI7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgICAgICB2YXIgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29weVtpXS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgICAgICB2YXIgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29weVtpXS5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aGlzLnRocm93bkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdWJqZWN0U3Vic2NyaXB0aW9uXzEuU3ViamVjdFN1YnNjcmlwdGlvbih0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuYXNPYnNlcnZhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgU3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdDtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuU3ViamVjdCA9IFN1YmplY3Q7XG4vKipcbiAqIEBjbGFzcyBBbm9ueW1vdXNTdWJqZWN0PFQ+XG4gKi9cbnZhciBBbm9ueW1vdXNTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQW5vbnltb3VzU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLm5leHQpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24uY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBbm9ueW1vdXNTdWJqZWN0O1xufShTdWJqZWN0KSk7XG5leHBvcnRzLkFub255bW91c1N1YmplY3QgPSBBbm9ueW1vdXNTdWJqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3ViamVjdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL1N1YmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHsgVGlsZW1hcCB9IGZyb20gJy4vc3JjL3RpbGVtYXAnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXgudHMiLCJpbXBvcnQgeyBhamF4IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2RvbS9hamF4JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVGlsZSB9IGZyb20gJy4vdGlsZSc7XG5pbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vaW1hZ2UtbG9hZGVyJztcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4vY2FtZXJhJztcblxuZXhwb3J0IGNsYXNzIFRpbGVtYXAge1xuICAgIHByaXZhdGUgbm9kZTogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBtYXBDb25maWc6IGFueTtcbiAgICBwcml2YXRlIGxvYWRlcjogSW1hZ2VMb2FkZXI7XG4gICAgcHJpdmF0ZSB0aWxlczogQXJyYXk8VGlsZVtdPiA9IFtdO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBpc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGNhbWVyYTogQ2FtZXJhO1xuICAgIHByaXZhdGUgYWRkaXRpb25hbEltYWdlczogQXJyYXk8SW1hZ2VMb2FkZXI+ID0gW107XG4gICAgcHJpdmF0ZSBzdGFydFg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzdGFydFk6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHJlc2l6ZUhhbmRsZXI6IEV2ZW50TGlzdGVuZXJPYmplY3Q7XG5cbiAgICBwcml2YXRlIHJlYWR5OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgY2xpY2s6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBzaG93VGlsZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSB0aWxlc0xvYWRlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHByaXZhdGUgb3B0aW9uczogYW55ID0ge1xuICAgICAgICBncmlkOiB0cnVlLFxuICAgICAgICBudW1iZXJPZlRpbGVzOiBmYWxzZSxcbiAgICAgICAgaW5kZXhPZlRpbGVzOiBmYWxzZSxcbiAgICAgICAgZ3JpZENvbG9yOiAnYmxhY2snLFxuICAgICAgICBhZGRpdGlvbmFsSW1hZ2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvciAoY2FudmFzSWQ6IHN0cmluZywgcGF0aFRvQ29uZmlnOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICAgICAgICB0aGlzLm5vZGUgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSAoL2FuZHJvaWR8d2Vib3N8aXBob25lfGlwYWR8aXBvZHxibGFja2JlcnJ5fGllbW9iaWxlfG9wZXJhIG1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMubm9kZS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXQocGF0aFRvQ29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2l6ZUhhbmRsZXIgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2FudmFzU2l6ZSgpIDp2b2lkIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IDxIVE1MRWxlbWVudD4gdGhpcy5ub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIHRoaXMud2lkdGggPSBwYXJlbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcGFyZW50Lm9mZnNldEhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENhbnZhc1NpemUoKSA6dm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEV2ZW50cygpIDp2b2lkIHtcbiAgICAgICAgbGV0IHg6IG51bWJlciwgeTogbnVtYmVyLCBpc01vdmU6IGJvb2xlYW4sIG1vdmVkOiBib29sZWFuID0gdHJ1ZTs7XG5cbiAgICAgICAgbGV0IHN0YXJ0ID0gKF94OiBudW1iZXIsIF95OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHggPSBfeDtcbiAgICAgICAgICAgIHkgPSBfeTtcbiAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5zdG9wKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG1vdmUgPSAoX3g6IG51bWJlciwgX3k6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGlzTW92ZSkge1xuICAgICAgICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5zZXRQb3NpdGlvbihfeCAtIHgsIF95IC0geSk7XG4gICAgICAgICAgICAgICAgeCA9IF94O1xuICAgICAgICAgICAgICAgIHkgPSBfeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgZW5kID0gKF94OiBudW1iZXIsIF95OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChpc01vdmUgJiYgIW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5jYW1lcmEuZ2V0SW5kZXhPZlRpbGUoX3gsIF95KTtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMudGlsZXNbcG9pbnQueV1bcG9pbnQueF07XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jbGljay5vbk5leHQoJ2ZvbycpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2submV4dCh0aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc01vdmUgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzdGFydChlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG1vdmUoZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVuZChlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVuZChlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzdGFydChlLm9mZnNldFgsIGUub2Zmc2V0WSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG1vdmUoZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVuZChlLm9mZnNldFgsIGUub2Zmc2V0WSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhdygpIDp2b2lkIHtcbiAgICAgICAgbGV0IHRpbGVzID0gdGhpcy5jYW1lcmEuZ2V0VGlsZXMoKTtcblxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGVQb3NpdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy50aWxlc1t0aWxlUG9zaXRpb25zLnldW3RpbGVQb3NpdGlvbnMueF0sXG4gICAgICAgICAgICAgICAgcG9zWCA9IHRpbGUueCAqIHRpbGUud2lkdGggKyB0aGlzLmNhbWVyYS5YLFxuICAgICAgICAgICAgICAgIHBvc1kgPSB0aWxlLnkgKiB0aWxlLmhlaWdodCArIHRoaXMuY2FtZXJhLlk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuaW1hZ2UsXG4gICAgICAgICAgICAgICAgdGlsZS5pbWFnZVgsXG4gICAgICAgICAgICAgICAgdGlsZS5pbWFnZVksXG4gICAgICAgICAgICAgICAgdGlsZS53aWR0aCxcbiAgICAgICAgICAgICAgICB0aWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICBwb3NYLFxuICAgICAgICAgICAgICAgIHBvc1ksXG4gICAgICAgICAgICAgICAgdGlsZS53aWR0aCxcbiAgICAgICAgICAgICAgICB0aWxlLmhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxJbWFnZXMgPSB0aWxlLmdldEltYWdlcygpO1xuICAgICAgICAgICAgaWYgKGFkZGl0aW9uYWxJbWFnZXMpIHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsSW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5udW1iZXJPZlRpbGVzKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5ncmlkQ29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiMTJweCBBcmlhbFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aWxlLklEICsgJycsIHBvc1ggKyAxLCBwb3NZICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW5kZXhPZlRpbGVzKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5ncmlkQ29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJib3R0b21cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiMTJweCBBcmlhbFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aWxlLnggKyAnICcgKyB0aWxlLnksIHBvc1ggKyAxLCBwb3NZICsgMzIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmdyaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0dyaWQodGhpcy50aWxlc1t0aWxlc1swXS54XVt0aWxlc1swXS55XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdHcmlkKHRpbGU6IFRpbGUpIDp2b2lkIHtcbiAgICAgICAgbGV0IHN0YXJ0UG9pbnQsIHBvaW50LFxuICAgICAgICAgICAgdGlsZXNldCA9IHRoaXMubWFwQ29uZmlnLnRpbGVzZXRzWzBdLFxuICAgICAgICAgICAgd2lkdGggPSB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMub3B0aW9ucy5ncmlkQ29sb3I7XG5cbiAgICAgICAgc3RhcnRQb2ludCA9IHRpbGUueSAqIHRpbGUud2lkdGggKyB0aGlzLmNhbWVyYS5YO1xuICAgICAgICBwb2ludCA9IHN0YXJ0UG9pbnQgLSB0aWxlc2V0LnRpbGV3aWR0aDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcG9pbnQgKz0gdGlsZXNldC50aWxld2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHBvaW50IC0gMC41LCAwKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8ocG9pbnQgLSAwLjUsIGhlaWdodCk7XG4gICAgICAgIH0gd2hpbGUocG9pbnQgPCBzdGFydFBvaW50ICsgd2lkdGgpXG5cbiAgICAgICAgc3RhcnRQb2ludCA9IHRpbGUueCAqIHRpbGUuaGVpZ2h0ICsgdGhpcy5jYW1lcmEuWVxuICAgICAgICBwb2ludCA9IHN0YXJ0UG9pbnQgLSB0aWxlc2V0LnRpbGVoZWlnaHQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHBvaW50ICs9IHRpbGVzZXQudGlsZWhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oMCwgcG9pbnQgLSAwLjUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh3aWR0aCwgcG9pbnQgLSAwLjUpO1xuICAgICAgICB9IHdoaWxlKHBvaW50IDwgc3RhcnRQb2ludCArIGhlaWdodClcblxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb25maWcodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikgOnZvaWQge1xuICAgICAgICBhamF4LmdldEpTT04odXJsKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGEpID0+IHsgY2FsbGJhY2soZGF0YSk7IH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7IGNvbnNvbGUubG9nKCdDYW4gbm90IGxvYWQgY29uZmlnJyk7IH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRJbWFnZSAoY2FsbGJhY2s6IEZ1bmN0aW9uKSA6dm9pZCB7XG4gICAgICAgIGxldCBpbWFnZXMgPSB0aGlzLm9wdGlvbnMuYWRkaXRpb25hbEltYWdlcy5sZW5ndGggKyAxLFxuICAgICAgICAgICAgY3VycmVudExvYWRlZEltYWdlcyA9IDA7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIodGhpcy5tYXBDb25maWcudGlsZXNldHNbMF0uaW1hZ2UsIChlcnI6IGFueSwgdjogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMb2FkZWRJbWFnZXMgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VzID09PSBjdXJyZW50TG9hZGVkSW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxJbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYWRkaXRpb25hbEltYWdlcy5mb3JFYWNoKChzcmM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoc3JjLCAoZXJyOiBhbnksIHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudExvYWRlZEltYWdlcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlcyA9PT0gY3VycmVudExvYWRlZEltYWdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsb2FkZXIubG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkaXRpb25hbEltYWdlcy5wdXNoKGxvYWRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uUGVyTnVtYmVyKG46IG51bWJlciwgdGlsZXNldDogYW55KSA6QXJyYXk8bnVtYmVyPiB7XG4gICAgICAgIGxldCByb3dzID0gTWF0aC5mbG9vcihuIC8gdGlsZXNldC5jb2x1bW5zKTtcbiAgICAgICAgcmV0dXJuIFsobiAtIDEpICUgdGlsZXNldC5jb2x1bW5zLCByb3dzXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRpbGVzICgpIDp2b2lkIHtcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5tYXBDb25maWcubGF5ZXJzWzBdO1xuICAgICAgICBsZXQgdGlsZXNldCA9IHRoaXMubWFwQ29uZmlnLnRpbGVzZXRzWzBdO1xuICAgICAgICBsZXQgdGlsZUNvdW50ID0gdGlsZXNldC50aWxlY291bnQ7XG4gICAgICAgIGxldCBhcnI6IFRpbGVbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMubWFwQ29uZmlnLmxheWVyc1swXS5kYXRhLmZvckVhY2goKHQ6IG51bWJlciwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoaSAvIGxheWVyLmhlaWdodCk7XG4gICAgICAgICAgICBsZXQgeCA9IGkgJSBsYXllci53aWR0aDtcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFBvc2l0aW9uUGVyTnVtYmVyKHQsIHRpbGVzZXQpO1xuICAgICAgICAgICAgbGV0IGltZ1Bvc1ggPSB0aWxlc2V0LnNwYWNpbmcgKyBwb3NbMF0gKiAodGlsZXNldC50aWxld2lkdGggKyB0aWxlc2V0Lm1hcmdpbik7XG4gICAgICAgICAgICBsZXQgaW1nUG9zWSA9IHRpbGVzZXQuc3BhY2luZyArIHBvc1sxXSAqICh0aWxlc2V0LnRpbGVoZWlnaHQgKyB0aWxlc2V0Lm1hcmdpbik7XG5cbiAgICAgICAgICAgIGFyci5wdXNoKG5ldyBUaWxlKHQsIHRpbGVzZXQudGlsZXdpZHRoLCB0aWxlc2V0LnRpbGVoZWlnaHQsIHgsIHksIGltZ1Bvc1gsIGltZ1Bvc1kpKTtcblxuICAgICAgICAgICAgaWYgKHggPT09IGxheWVyLndpZHRoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMucHVzaChhcnIpO1xuICAgICAgICAgICAgICAgIGFyciA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQocGF0aFRvQ29uZmlnOiBzdHJpbmcpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDb25maWcocGF0aFRvQ29uZmlnLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1hcENvbmZpZyA9IGRhdGE7XG4gICAgICAgICAgICBsZXQgdGlsZXNldCA9IHRoaXMubWFwQ29uZmlnLnRpbGVzZXRzWzBdO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMubWFwQ29uZmlnLnRpbGVzZXRzWzBdLmNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcENvbmZpZy50aWxlc2V0c1swXS5jb2x1bW5zID0gTWF0aC5mbG9vcigodGlsZXNldC5pbWFnZXdpZHRoIC0gdGlsZXNldC5zcGFjaW5nKSAvICh0aWxlc2V0LnRpbGV3aWR0aCArIHRpbGVzZXQubWFyZ2luKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMubWFwQ29uZmlnLmxheWVyc1swXTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FudmFzU2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRDYW52YXNTaXplKCk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRpbGVzZXQudGlsZXdpZHRoICogbGF5ZXIud2lkdGgsIHRpbGVzZXQudGlsZWhlaWdodCAqIGxheWVyLmhlaWdodCwgdGlsZXNldC50aWxld2lkdGgsIHRpbGVzZXQudGlsZWhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5zZXRTdGFydFBvc2l0aW9uKHRoaXMuc3RhcnRYLCB0aGlzLnN0YXJ0WSk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5kcmF3RXZlbnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuYW5pbWF0aW9uRW5kRXZlbnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRTaG93VGlsZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGlsZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEV2ZW50cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU2hvd1RpbGVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZW5kU2hvd1RpbGVzKCkgOnZvaWQge1xuICAgICAgICB0aGlzLnNob3dUaWxlcy5uZXh0KHRoaXMudGlsZXNGaWx0ZXIodGhpcy5jYW1lcmEuZ2V0VGlsZXMoKSkpO1xuICAgICAgICB0aGlzLnRpbGVzTG9hZGVyLm5leHQoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aWxlc0ZpbHRlciAodGlsZXM6IGFueSkgOkFycmF5PGFueT4ge1xuICAgICAgICBsZXQgYXJyOiBhbnkgPSBbXTtcblxuICAgICAgICB0aWxlcy5mb3JFYWNoKChwb2ludDogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMudGlsZXNbcG9pbnQueV1bcG9pbnQueF07XG4gICAgICAgICAgICBpZiAodGlsZS5TdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aWxlLnNldFJlcXVlc3RpbmdTdGF0dXMoKTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChwb2ludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0FsbExvYWRlZCgpIDpib29sZWFuIHtcbiAgICAgICAgbGV0IGksIHJlc3VsdCA9IHRydWUsXG4gICAgICAgICAgICBwb2ludHMgPSB0aGlzLmNhbWVyYS5nZXRUaWxlcygpLFxuICAgICAgICAgICAgbCA9IHBvaW50cy5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBvaW50ID0gcG9pbnRzW2ldLFxuICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLnRpbGVzW3BvaW50LnldW3BvaW50LnhdO1xuXG4gICAgICAgICAgICBpZiAodGlsZS5TdGF0dXMgIT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNpemUgKCkgOnZvaWQge1xuICAgICAgICB0aGlzLmdldENhbnZhc1NpemUoKTtcbiAgICAgICAgdGhpcy5zZXRDYW52YXNTaXplKCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhZHlFdmVudCgpIDpTdWJqZWN0PGFueT4ge1xuICAgICAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5yZWFkeS5uZXh0KCk7IH0sIDUwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNsaWNrRXZlbnQoKSA6U3ViamVjdDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpY2s7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzaG93VGlsZXNFdmVudCgpIDpTdWJqZWN0PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93VGlsZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0aWxlc0xvYWRlckV2ZW50KCkgOlN1YmplY3Q8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVzTG9hZGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlVG8oaW5kZXhYOiBudW1iZXIsIGluZGV4WTogbnVtYmVyKSA6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLm1vdmUoaW5kZXhYLCBpbmRleFkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydFggPSBpbmRleFg7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0WSA9IGluZGV4WTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbWVyYSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLnNldFN0YXJ0UG9zaXRpb24odGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRMYXllclRvVGlsZShvcHRpb25zOiBhbnkpIDp2b2lkIHtcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLnRpbGVzW29wdGlvbnMueV1bb3B0aW9ucy54XTtcbiAgICAgICAgdGlsZS5zZXRSZXF1ZXN0ZWRTdGF0dXMoKTtcbiAgICAgICAgaWYgKCFvcHRpb25zLmVtcHR5KSB7XG4gICAgICAgICAgICB0aWxlLmFkZEltYWdlKHRoaXMuYWRkaXRpb25hbEltYWdlc1tvcHRpb25zLmFkZGl0aW9uYWxJbWFnZV0uaW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0FsbExvYWRlZCgpKSB7IHRoaXMudGlsZXNMb2FkZXIubmV4dCh7IGlzTG9hZGluZzogZmFsc2UgfSk7IH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlcik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RpbGVtYXAudHMiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBBamF4T2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9BamF4T2JzZXJ2YWJsZScpO1xuZXhwb3J0cy5hamF4ID0gQWpheE9ic2VydmFibGVfMS5BamF4T2JzZXJ2YWJsZS5jcmVhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hamF4LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvb2JzZXJ2YWJsZS9kb20vYWpheC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi8uLi91dGlsL3Jvb3QnKTtcbnZhciB0cnlDYXRjaF8xID0gcmVxdWlyZSgnLi4vLi4vdXRpbC90cnlDYXRjaCcpO1xudmFyIGVycm9yT2JqZWN0XzEgPSByZXF1aXJlKCcuLi8uLi91dGlsL2Vycm9yT2JqZWN0Jyk7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vLi4vT2JzZXJ2YWJsZScpO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uLy4uL1N1YnNjcmliZXInKTtcbnZhciBtYXBfMSA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdG9ycy9tYXAnKTtcbmZ1bmN0aW9uIGdldENPUlNSZXF1ZXN0KCkge1xuICAgIGlmIChyb290XzEucm9vdC5YTUxIdHRwUmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IHJvb3RfMS5yb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEhcm9vdF8xLnJvb3QuWERvbWFpblJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyByb290XzEucm9vdC5YRG9tYWluUmVxdWVzdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDT1JTIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0WE1MSHR0cFJlcXVlc3QoKSB7XG4gICAgaWYgKHJvb3RfMS5yb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgcm9vdF8xLnJvb3QuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBwcm9nSWQgPSB2b2lkIDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcHJvZ0lkcyA9IFsnTXN4bWwyLlhNTEhUVFAnLCAnTWljcm9zb2Z0LlhNTEhUVFAnLCAnTXN4bWwyLlhNTEhUVFAuNC4wJ107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dJZCA9IHByb2dJZHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXcgcm9vdF8xLnJvb3QuQWN0aXZlWE9iamVjdChwcm9nSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgcm9vdF8xLnJvb3QuQWN0aXZlWE9iamVjdChwcm9nSWQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1hNTEh0dHBSZXF1ZXN0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBhamF4R2V0KHVybCwgaGVhZGVycykge1xuICAgIGlmIChoZWFkZXJzID09PSB2b2lkIDApIHsgaGVhZGVycyA9IG51bGw7IH1cbiAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHsgbWV0aG9kOiAnR0VUJywgdXJsOiB1cmwsIGhlYWRlcnM6IGhlYWRlcnMgfSk7XG59XG5leHBvcnRzLmFqYXhHZXQgPSBhamF4R2V0O1xuO1xuZnVuY3Rpb24gYWpheFBvc3QodXJsLCBib2R5LCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ1BPU1QnLCB1cmw6IHVybCwgYm9keTogYm9keSwgaGVhZGVyczogaGVhZGVycyB9KTtcbn1cbmV4cG9ydHMuYWpheFBvc3QgPSBhamF4UG9zdDtcbjtcbmZ1bmN0aW9uIGFqYXhEZWxldGUodXJsLCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ0RFTEVURScsIHVybDogdXJsLCBoZWFkZXJzOiBoZWFkZXJzIH0pO1xufVxuZXhwb3J0cy5hamF4RGVsZXRlID0gYWpheERlbGV0ZTtcbjtcbmZ1bmN0aW9uIGFqYXhQdXQodXJsLCBib2R5LCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ1BVVCcsIHVybDogdXJsLCBib2R5OiBib2R5LCBoZWFkZXJzOiBoZWFkZXJzIH0pO1xufVxuZXhwb3J0cy5hamF4UHV0ID0gYWpheFB1dDtcbjtcbmZ1bmN0aW9uIGFqYXhQYXRjaCh1cmwsIGJvZHksIGhlYWRlcnMpIHtcbiAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHsgbWV0aG9kOiAnUEFUQ0gnLCB1cmw6IHVybCwgYm9keTogYm9keSwgaGVhZGVyczogaGVhZGVycyB9KTtcbn1cbmV4cG9ydHMuYWpheFBhdGNoID0gYWpheFBhdGNoO1xuO1xudmFyIG1hcFJlc3BvbnNlID0gbWFwXzEubWFwKGZ1bmN0aW9uICh4LCBpbmRleCkgeyByZXR1cm4geC5yZXNwb25zZTsgfSk7XG5mdW5jdGlvbiBhamF4R2V0SlNPTih1cmwsIGhlYWRlcnMpIHtcbiAgICByZXR1cm4gbWFwUmVzcG9uc2UobmV3IEFqYXhPYnNlcnZhYmxlKHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgfSkpO1xufVxuZXhwb3J0cy5hamF4R2V0SlNPTiA9IGFqYXhHZXRKU09OO1xuO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbnZhciBBamF4T2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFqYXhPYnNlcnZhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFqYXhPYnNlcnZhYmxlKHVybE9yUmVxdWVzdCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIGNyZWF0ZVhIUjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyb3NzRG9tYWluID8gZ2V0Q09SU1JlcXVlc3QuY2FsbCh0aGlzKSA6IGdldFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IGZhbHNlLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgdGltZW91dDogMFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHVybE9yUmVxdWVzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlcXVlc3QudXJsID0gdXJsT3JSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB1cmxPclJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAodXJsT3JSZXF1ZXN0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RbcHJvcF0gPSB1cmxPclJlcXVlc3RbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIEFqYXhPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnJlcXVlc3QpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIGZvciBhbiBBamF4IHJlcXVlc3Qgd2l0aCBlaXRoZXIgYSByZXF1ZXN0IG9iamVjdCB3aXRoXG4gICAgICogdXJsLCBoZWFkZXJzLCBldGMgb3IgYSBzdHJpbmcgZm9yIGEgVVJMLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoJy9wcm9kdWN0cycpO1xuICAgICAqIHNvdXJjZSA9IFJ4Lk9ic2VydmFibGUuYWpheCh7IHVybDogJ3Byb2R1Y3RzJywgbWV0aG9kOiAnR0VUJyB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gcmVxdWVzdCBDYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICogICBBIHN0cmluZyBvZiB0aGUgVVJMIHRvIG1ha2UgdGhlIEFqYXggY2FsbC5cbiAgICAgKiAgIEFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllc1xuICAgICAqICAgLSB1cmw6IFVSTCBvZiB0aGUgcmVxdWVzdFxuICAgICAqICAgLSBib2R5OiBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICAgICAqICAgLSBtZXRob2Q6IE1ldGhvZCBvZiB0aGUgcmVxdWVzdCwgc3VjaCBhcyBHRVQsIFBPU1QsIFBVVCwgUEFUQ0gsIERFTEVURVxuICAgICAqICAgLSBhc3luYzogV2hldGhlciB0aGUgcmVxdWVzdCBpcyBhc3luY1xuICAgICAqICAgLSBoZWFkZXJzOiBPcHRpb25hbCBoZWFkZXJzXG4gICAgICogICAtIGNyb3NzRG9tYWluOiB0cnVlIGlmIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QsIGVsc2UgZmFsc2VcbiAgICAgKiAgIC0gY3JlYXRlWEhSOiBhIGZ1bmN0aW9uIHRvIG92ZXJyaWRlIGlmIHlvdSBuZWVkIHRvIHVzZSBhbiBhbHRlcm5hdGVcbiAgICAgKiAgIFhNTEh0dHBSZXF1ZXN0IGltcGxlbWVudGF0aW9uLlxuICAgICAqICAgLSByZXN1bHRTZWxlY3RvcjogYSBmdW5jdGlvbiB0byB1c2UgdG8gYWx0ZXIgdGhlIG91dHB1dCB2YWx1ZSB0eXBlIG9mXG4gICAgICogICB0aGUgT2JzZXJ2YWJsZS4gR2V0cyB7QGxpbmsgQWpheFJlc3BvbnNlfSBhcyBhbiBhcmd1bWVudC5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIGNvbnRhaW5pbmcgdGhlIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBuYW1lIGFqYXhcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICovXG4gICAgQWpheE9ic2VydmFibGUuY3JlYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uICh1cmxPclJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUodXJsT3JSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgY3JlYXRlLmdldCA9IGFqYXhHZXQ7XG4gICAgICAgIGNyZWF0ZS5wb3N0ID0gYWpheFBvc3Q7XG4gICAgICAgIGNyZWF0ZS5kZWxldGUgPSBhamF4RGVsZXRlO1xuICAgICAgICBjcmVhdGUucHV0ID0gYWpheFB1dDtcbiAgICAgICAgY3JlYXRlLnBhdGNoID0gYWpheFBhdGNoO1xuICAgICAgICBjcmVhdGUuZ2V0SlNPTiA9IGFqYXhHZXRKU09OO1xuICAgICAgICByZXR1cm4gY3JlYXRlO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIEFqYXhPYnNlcnZhYmxlO1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5BamF4T2JzZXJ2YWJsZSA9IEFqYXhPYnNlcnZhYmxlO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBBamF4U3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFqYXhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFqYXhTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCByZXF1ZXN0KSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIHZhciBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xuICAgICAgICAvLyBmb3JjZSBDT1JTIGlmIHJlcXVlc3RlZFxuICAgICAgICBpZiAoIXJlcXVlc3QuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSkge1xuICAgICAgICAgICAgaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcbiAgICAgICAgfVxuICAgICAgICAvLyBlbnN1cmUgY29udGVudCB0eXBlIGlzIHNldFxuICAgICAgICBpZiAoISgnQ29udGVudC1UeXBlJyBpbiBoZWFkZXJzKSAmJiAhKHJvb3RfMS5yb290LkZvcm1EYXRhICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIHJvb3RfMS5yb290LkZvcm1EYXRhKSAmJiB0eXBlb2YgcmVxdWVzdC5ib2R5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04JztcbiAgICAgICAgfVxuICAgICAgICAvLyBwcm9wZXJseSBzZXJpYWxpemUgYm9keVxuICAgICAgICByZXF1ZXN0LmJvZHkgPSB0aGlzLnNlcmlhbGl6ZUJvZHkocmVxdWVzdC5ib2R5LCByZXF1ZXN0LmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKTtcbiAgICAgICAgdGhpcy5zZW5kKCk7XG4gICAgfVxuICAgIEFqYXhTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgeGhyID0gX2EueGhyLCByZXF1ZXN0ID0gX2EucmVxdWVzdCwgZGVzdGluYXRpb24gPSBfYS5kZXN0aW5hdGlvbjtcbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IEFqYXhSZXNwb25zZShlLCB4aHIsIHJlcXVlc3QpO1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHJlc3BvbnNlKTtcbiAgICB9O1xuICAgIEFqYXhTdWJzY3JpYmVyLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCByZXF1ZXN0ID0gX2EucmVxdWVzdCwgX2IgPSBfYS5yZXF1ZXN0LCB1c2VyID0gX2IudXNlciwgbWV0aG9kID0gX2IubWV0aG9kLCB1cmwgPSBfYi51cmwsIGFzeW5jID0gX2IuYXN5bmMsIHBhc3N3b3JkID0gX2IucGFzc3dvcmQsIGhlYWRlcnMgPSBfYi5oZWFkZXJzLCBib2R5ID0gX2IuYm9keTtcbiAgICAgICAgdmFyIGNyZWF0ZVhIUiA9IHJlcXVlc3QuY3JlYXRlWEhSO1xuICAgICAgICB2YXIgeGhyID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaChjcmVhdGVYSFIpLmNhbGwocmVxdWVzdCk7XG4gICAgICAgIGlmICh4aHIgPT09IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueGhyID0geGhyO1xuICAgICAgICAgICAgLy8gc2V0IHVwIHRoZSBldmVudHMgYmVmb3JlIG9wZW4gWEhSXG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvVXNpbmdfWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICAgIC8vIFlvdSBuZWVkIHRvIGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJlZm9yZSBjYWxsaW5nIG9wZW4oKSBvbiB0aGUgcmVxdWVzdC5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB0aGUgcHJvZ3Jlc3MgZXZlbnRzIHdpbGwgbm90IGZpcmUuXG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRzKHhociwgcmVxdWVzdCk7XG4gICAgICAgICAgICAvLyBvcGVuIFhIUlxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaCh4aHIub3BlbikuY2FsbCh4aHIsIG1ldGhvZCwgdXJsLCBhc3luYywgdXNlciwgcGFzc3dvcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaCh4aHIub3BlbikuY2FsbCh4aHIsIG1ldGhvZCwgdXJsLCBhc3luYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcihlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGltZW91dCwgcmVzcG9uc2VUeXBlIGFuZCB3aXRoQ3JlZGVudGlhbHMgY2FuIGJlIHNldCBvbmNlIHRoZSBYSFIgaXMgb3BlblxuICAgICAgICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSByZXF1ZXN0LnRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIXJlcXVlc3Qud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IGhlYWRlcnNcbiAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVycyh4aHIsIGhlYWRlcnMpO1xuICAgICAgICAgICAgLy8gZmluYWxseSBzZW5kIHRoZSByZXF1ZXN0XG4gICAgICAgICAgICByZXN1bHQgPSBib2R5ID8gdHJ5Q2F0Y2hfMS50cnlDYXRjaCh4aHIuc2VuZCkuY2FsbCh4aHIsIGJvZHkpIDogdHJ5Q2F0Y2hfMS50cnlDYXRjaCh4aHIuc2VuZCkuY2FsbCh4aHIpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geGhyO1xuICAgIH07XG4gICAgQWpheFN1YnNjcmliZXIucHJvdG90eXBlLnNlcmlhbGl6ZUJvZHkgPSBmdW5jdGlvbiAoYm9keSwgY29udGVudFR5cGUpIHtcbiAgICAgICAgaWYgKCFib2R5IHx8IHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuRm9ybURhdGEgJiYgYm9keSBpbnN0YW5jZW9mIHJvb3RfMS5yb290LkZvcm1EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIHZhciBzcGxpdEluZGV4ID0gY29udGVudFR5cGUuaW5kZXhPZignOycpO1xuICAgICAgICAgICAgaWYgKHNwbGl0SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29udGVudFR5cGUgPSBjb250ZW50VHlwZS5zdWJzdHJpbmcoMCwgc3BsaXRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYm9keSkubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIChlbmNvZGVVUkkoa2V5KSArIFwiPVwiICsgZW5jb2RlVVJJKGJvZHlba2V5XSkpOyB9KS5qb2luKCcmJyk7XG4gICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBamF4U3Vic2NyaWJlci5wcm90b3R5cGUuc2V0SGVhZGVycyA9IGZ1bmN0aW9uICh4aHIsIGhlYWRlcnMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFqYXhTdWJzY3JpYmVyLnByb3RvdHlwZS5zZXR1cEV2ZW50cyA9IGZ1bmN0aW9uICh4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzU3Vic2NyaWJlciA9IHJlcXVlc3QucHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICBmdW5jdGlvbiB4aHJUaW1lb3V0KGUpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHhoclRpbWVvdXQsIHN1YnNjcmliZXIgPSBfYS5zdWJzY3JpYmVyLCBwcm9ncmVzc1N1YnNjcmliZXIgPSBfYS5wcm9ncmVzc1N1YnNjcmliZXIsIHJlcXVlc3QgPSBfYS5yZXF1ZXN0O1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhUaW1lb3V0RXJyb3IodGhpcywgcmVxdWVzdCkpOyAvL1RPRE86IE1ha2UgYmV0dGVyZXIuXG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICB4aHIub250aW1lb3V0ID0geGhyVGltZW91dDtcbiAgICAgICAgeGhyVGltZW91dC5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgeGhyVGltZW91dC5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICAgeGhyVGltZW91dC5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgIGlmICh4aHIudXBsb2FkICYmICd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHZhciB4aHJQcm9ncmVzc18xO1xuICAgICAgICAgICAgICAgIHhoclByb2dyZXNzXzEgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NTdWJzY3JpYmVyID0geGhyUHJvZ3Jlc3NfMS5wcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHJvb3RfMS5yb290LlhEb21haW5SZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5vbnByb2dyZXNzID0geGhyUHJvZ3Jlc3NfMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IHhoclByb2dyZXNzXzE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHhoclByb2dyZXNzXzEucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHhockVycm9yXzE7XG4gICAgICAgICAgICB4aHJFcnJvcl8xID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSB4aHJFcnJvcl8xLCBwcm9ncmVzc1N1YnNjcmliZXIgPSBfYS5wcm9ncmVzc1N1YnNjcmliZXIsIHN1YnNjcmliZXIgPSBfYS5zdWJzY3JpYmVyLCByZXF1ZXN0ID0gX2EucmVxdWVzdDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheEVycm9yKCdhamF4IGVycm9yJywgdGhpcywgcmVxdWVzdCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0geGhyRXJyb3JfMTtcbiAgICAgICAgICAgIHhockVycm9yXzEucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgICAgICB4aHJFcnJvcl8xLnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICAgICAgICAgeGhyRXJyb3JfMS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24geGhyUmVhZHlTdGF0ZUNoYW5nZShlKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB4aHJSZWFkeVN0YXRlQ2hhbmdlLCBzdWJzY3JpYmVyID0gX2Euc3Vic2NyaWJlciwgcHJvZ3Jlc3NTdWJzY3JpYmVyID0gX2EucHJvZ3Jlc3NTdWJzY3JpYmVyLCByZXF1ZXN0ID0gX2EucmVxdWVzdDtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAvLyBub3JtYWxpemUgSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MClcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzXzEgPSB0aGlzLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHRoaXMuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9ICh0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gKHRoaXMucmVzcG9uc2UgfHwgdGhpcy5yZXNwb25zZVRleHQpIDogdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gZml4IHN0YXR1cyBjb2RlIHdoZW4gaXQgaXMgMCAoMCBzdGF0dXMgaXMgdW5kb2N1bWVudGVkKS5cbiAgICAgICAgICAgICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgICAgICAgICAgIC8vIHdoaWxlIHJldHJpZXZpbmcgZmlsZXMgZnJvbSBhcHBsaWNhdGlvbiBjYWNoZS5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzXzEgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzXzEgPSByZXNwb25zZSA/IDIwMCA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgyMDAgPD0gc3RhdHVzXzEgJiYgc3RhdHVzXzEgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheEVycm9yKCdhamF4IGVycm9yICcgKyBzdGF0dXNfMSwgdGhpcywgcmVxdWVzdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB4aHJSZWFkeVN0YXRlQ2hhbmdlO1xuICAgICAgICB4aHJSZWFkeVN0YXRlQ2hhbmdlLnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICAgICB4aHJSZWFkeVN0YXRlQ2hhbmdlLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgICAgeGhyUmVhZHlTdGF0ZUNoYW5nZS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9O1xuICAgIEFqYXhTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgZG9uZSA9IF9hLmRvbmUsIHhociA9IF9hLnhocjtcbiAgICAgICAgaWYgKCFkb25lICYmIHhociAmJiB4aHIucmVhZHlTdGF0ZSAhPT0gNCAmJiB0eXBlb2YgeGhyLmFib3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gQWpheFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG5leHBvcnRzLkFqYXhTdWJzY3JpYmVyID0gQWpheFN1YnNjcmliZXI7XG4vKipcbiAqIEEgbm9ybWFsaXplZCBBSkFYIHJlc3BvbnNlLlxuICpcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhSZXNwb25zZVxuICovXG52YXIgQWpheFJlc3BvbnNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBamF4UmVzcG9uc2Uob3JpZ2luYWxFdmVudCwgeGhyLCByZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IG9yaWdpbmFsRXZlbnQ7XG4gICAgICAgIHRoaXMueGhyID0geGhyO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0geGhyLnJlc3BvbnNlVHlwZSB8fCByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHBhcnNlWGhyUmVzcG9uc2UodGhpcy5yZXNwb25zZVR5cGUsIHhocik7XG4gICAgfVxuICAgIHJldHVybiBBamF4UmVzcG9uc2U7XG59KCkpO1xuZXhwb3J0cy5BamF4UmVzcG9uc2UgPSBBamF4UmVzcG9uc2U7XG4vKipcbiAqIEEgbm9ybWFsaXplZCBBSkFYIGVycm9yLlxuICpcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhFcnJvclxuICovXG52YXIgQWpheEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWpheEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFqYXhFcnJvcihtZXNzYWdlLCB4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMueGhyID0geGhyO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0geGhyLnJlc3BvbnNlVHlwZSB8fCByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHBhcnNlWGhyUmVzcG9uc2UodGhpcy5yZXNwb25zZVR5cGUsIHhocik7XG4gICAgfVxuICAgIHJldHVybiBBamF4RXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkFqYXhFcnJvciA9IEFqYXhFcnJvcjtcbmZ1bmN0aW9uIHBhcnNlWGhyUmVzcG9uc2UocmVzcG9uc2VUeXBlLCB4aHIpIHtcbiAgICBzd2l0Y2ggKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICAgIGlmICgncmVzcG9uc2UnIGluIHhocikge1xuICAgICAgICAgICAgICAgIC8vSUUgZG9lcyBub3Qgc3VwcG9ydCBqc29uIGFzIHJlc3BvbnNlVHlwZSwgcGFyc2UgaXQgaW50ZXJuYWxseVxuICAgICAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUeXBlID8geGhyLnJlc3BvbnNlIDogSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dCB8fCAnbnVsbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCB8fCAnbnVsbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlICd4bWwnOlxuICAgICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTDtcbiAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gKCdyZXNwb25zZScgaW4geGhyKSA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgfVxufVxuLyoqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4VGltZW91dEVycm9yXG4gKi9cbnZhciBBamF4VGltZW91dEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWpheFRpbWVvdXRFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBamF4VGltZW91dEVycm9yKHhociwgcmVxdWVzdCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCAnYWpheCB0aW1lb3V0JywgeGhyLCByZXF1ZXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIEFqYXhUaW1lb3V0RXJyb3I7XG59KEFqYXhFcnJvcikpO1xuZXhwb3J0cy5BamF4VGltZW91dEVycm9yID0gQWpheFRpbWVvdXRFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFqYXhPYnNlcnZhYmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvb2JzZXJ2YWJsZS9kb20vQWpheE9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZlcicpO1xuZnVuY3Rpb24gdG9TdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihPYnNlcnZlcl8xLmVtcHR5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbn1cbmV4cG9ydHMudG9TdWJzY3JpYmVyID0gdG9TdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9TdWJzY3JpYmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC90b1N1YnNjcmliZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPSBudWxsICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jztcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzT2JqZWN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc09iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gb25lIG9yIG1vcmUgZXJyb3JzIGhhdmUgb2NjdXJyZWQgZHVyaW5nIHRoZVxuICogYHVuc3Vic2NyaWJlYCBvZiBhIHtAbGluayBTdWJzY3JpcHRpb259LlxuICovXG52YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVuc3Vic2NyaXB0aW9uRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICB2YXIgZXJyID0gRXJyb3IuY2FsbCh0aGlzLCBlcnJvcnMgP1xuICAgICAgICAgICAgZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuICBcIiArIGVycm9ycy5tYXAoZnVuY3Rpb24gKGVyciwgaSkgeyByZXR1cm4gKChpICsgMSkgKyBcIikgXCIgKyBlcnIudG9TdHJpbmcoKSk7IH0pLmpvaW4oJ1xcbiAgJykgOiAnJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIFVuc3Vic2NyaXB0aW9uRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSBVbnN1YnNjcmlwdGlvbkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG5mdW5jdGlvbiBnZXRTeW1ib2xPYnNlcnZhYmxlKGNvbnRleHQpIHtcbiAgICB2YXIgJCRvYnNlcnZhYmxlO1xuICAgIHZhciBTeW1ib2wgPSBjb250ZXh0LlN5bWJvbDtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcbiAgICAgICAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG4gICAgICAgICAgICBTeW1ib2wub2JzZXJ2YWJsZSA9ICQkb2JzZXJ2YWJsZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJCRvYnNlcnZhYmxlID0gJ0BAb2JzZXJ2YWJsZSc7XG4gICAgfVxuICAgIHJldHVybiAkJG9ic2VydmFibGU7XG59XG5leHBvcnRzLmdldFN5bWJvbE9ic2VydmFibGUgPSBnZXRTeW1ib2xPYnNlcnZhYmxlO1xuZXhwb3J0cy5vYnNlcnZhYmxlID0gZ2V0U3ltYm9sT2JzZXJ2YWJsZShyb290XzEucm9vdCk7XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBvYnNlcnZhYmxlIGluc3RlYWRcbiAqL1xuZXhwb3J0cy4kJG9ic2VydmFibGUgPSBleHBvcnRzLm9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvc3ltYm9sL29ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoJy4vbm9vcCcpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkoZm5zKTtcbn1cbmV4cG9ydHMucGlwZSA9IHBpcGU7XG4vKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKCFmbnMpIHtcbiAgICAgICAgcmV0dXJuIG5vb3BfMS5ub29wO1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG5leHBvcnRzLnBpcGVGcm9tQXJyYXkgPSBwaXBlRnJvbUFycmF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvcGlwZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuZnVuY3Rpb24gbm9vcCgpIHsgfVxuZXhwb3J0cy5ub29wID0gbm9vcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vb3AuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL25vb3AuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xuLyoqXG4gKiBBcHBsaWVzIGEgZ2l2ZW4gYHByb2plY3RgIGZ1bmN0aW9uIHRvIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLCBhbmQgZW1pdHMgdGhlIHJlc3VsdGluZyB2YWx1ZXMgYXMgYW4gT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZSBbQXJyYXkucHJvdG90eXBlLm1hcCgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9tYXApLFxuICogaXQgcGFzc2VzIGVhY2ggc291cmNlIHZhbHVlIHRocm91Z2ggYSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiB0byBnZXRcbiAqIGNvcnJlc3BvbmRpbmcgb3V0cHV0IHZhbHVlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogU2ltaWxhciB0byB0aGUgd2VsbCBrbm93biBgQXJyYXkucHJvdG90eXBlLm1hcGAgZnVuY3Rpb24sIHRoaXMgb3BlcmF0b3JcbiAqIGFwcGxpZXMgYSBwcm9qZWN0aW9uIHRvIGVhY2ggdmFsdWUgYW5kIGVtaXRzIHRoYXQgcHJvamVjdGlvbiBpbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBldmVyeSBjbGljayB0byB0aGUgY2xpZW50WCBwb3NpdGlvbiBvZiB0aGF0IGNsaWNrPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBwb3NpdGlvbnMgPSBjbGlja3MubWFwKGV2ID0+IGV2LmNsaWVudFgpO1xuICogcG9zaXRpb25zLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtYXBUb31cbiAqIEBzZWUge0BsaW5rIHBsdWNrfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBSfSBwcm9qZWN0IFRoZSBmdW5jdGlvbiB0byBhcHBseVxuICogdG8gZWFjaCBgdmFsdWVgIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBUaGUgYGluZGV4YCBwYXJhbWV0ZXIgaXNcbiAqIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGVcbiAqIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGVmaW5lIHdoYXQgYHRoaXNgIGlzIGluIHRoZVxuICogYHByb2plY3RgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIHRyYW5zZm9ybWVkIGJ5IHRoZSBnaXZlbiBgcHJvamVjdGAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIG1hcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWFwKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwT3BlcmF0aW9uKHNvdXJjZSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb2plY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IGlzIG5vdCBhIGZ1bmN0aW9uLiBBcmUgeW91IGxvb2tpbmcgZm9yIGBtYXBUbygpYD8nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IE1hcE9wZXJhdG9yKHByb2plY3QsIHRoaXNBcmcpKTtcbiAgICB9O1xufVxuZXhwb3J0cy5tYXAgPSBtYXA7XG52YXIgTWFwT3BlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hcE9wZXJhdG9yKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICB9XG4gICAgTWFwT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNYXBTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJvamVjdCwgdGhpcy50aGlzQXJnKSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFwT3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0cy5NYXBPcGVyYXRvciA9IE1hcE9wZXJhdG9yO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBNYXBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFwU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYXBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmcgfHwgdGhpcztcbiAgICB9XG4gICAgLy8gTk9URTogVGhpcyBsb29rcyB1bm9wdGltaXplZCwgYnV0IGl0J3MgYWN0dWFsbHkgcHVycG9zZWZ1bGx5IE5PVFxuICAgIC8vIHVzaW5nIHRyeS9jYXRjaCBvcHRpbWl6YXRpb25zLlxuICAgIE1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByb2plY3QuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmNvdW50KyspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9O1xuICAgIHJldHVybiBNYXBTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3J4anMvb3BlcmF0b3JzL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gYWN0aW9uIGlzIGludmFsaWQgYmVjYXVzZSB0aGUgb2JqZWN0IGhhcyBiZWVuXG4gKiB1bnN1YnNjcmliZWQuXG4gKlxuICogQHNlZSB7QGxpbmsgU3ViamVjdH1cbiAqIEBzZWUge0BsaW5rIEJlaGF2aW9yU3ViamVjdH1cbiAqXG4gKiBAY2xhc3MgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcbiAqL1xudmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKSB7XG4gICAgICAgIHZhciBlcnIgPSBfc3VwZXIuY2FsbCh0aGlzLCAnb2JqZWN0IHVuc3Vic2NyaWJlZCcpO1xuICAgICAgICB0aGlzLm5hbWUgPSBlcnIubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdFN1YnNjcmlwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaXB0aW9uKHN1YmplY3QsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIFN1YmplY3RTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gc3ViamVjdC5vYnNlcnZlcnM7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IG51bGw7XG4gICAgICAgIGlmICghb2JzZXJ2ZXJzIHx8IG9ic2VydmVycy5sZW5ndGggPT09IDAgfHwgc3ViamVjdC5pc1N0b3BwZWQgfHwgc3ViamVjdC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaWJlckluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5zdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2Uoc3Vic2NyaWJlckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3RTdWJzY3JpcHRpb247XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJqZWN0U3Vic2NyaXB0aW9uID0gU3ViamVjdFN1YnNjcmlwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3RTdWJzY3JpcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0U3Vic2NyaXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY2xhc3MgVGlsZSB7XG4gICAgcHJpdmF0ZSBpZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3g6IG51bWJlcjtcbiAgICBwcml2YXRlIF95OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX2ltYWdlUG9zaXRpb25YOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfaW1hZ2VQb3NpdGlvblk6IG51bWJlcjtcblxuICAgIHByaXZhdGUgb3RoZXJMYXllcnM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XG5cbiAgICBwcml2YXRlIHJlcXVlc3RTdGF0dXM6IG51bWJlciA9IDA7IC8vIDAgLSBub3QgcmVxdWVzdGVkLCAxIC0gcmVxdWVzdGluZywgMiAtIHJlcXVlc3RlZFxuXG4gICAgY29uc3RydWN0b3IgKGlkOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBpbmRleE9mQXJyYXlYOiBudW1iZXIsIGluZGV4T2ZBcnJheVk6IG51bWJlciwgaW1hZ2VQb3NpdGlvblg6IG51bWJlciwgaW1hZ2VQb3NpdGlvblk6IG51bWJlcikge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuX3ggPSBpbmRleE9mQXJyYXlYO1xuICAgICAgICB0aGlzLl95ID0gaW5kZXhPZkFycmF5WTtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuX2ltYWdlUG9zaXRpb25YID0gaW1hZ2VQb3NpdGlvblg7XG4gICAgICAgIHRoaXMuX2ltYWdlUG9zaXRpb25ZID0gaW1hZ2VQb3NpdGlvblk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBJRCgpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHgoKSA6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB5KCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgd2lkdGgoKSA6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaGVpZ2h0KCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpbWFnZVgoKSA6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlUG9zaXRpb25YO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaW1hZ2VZKCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVBvc2l0aW9uWTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IFN0YXR1cygpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0U3RhdHVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRSZXF1ZXN0aW5nU3RhdHVzKCkgOnZvaWQge1xuICAgICAgICB0aGlzLnJlcXVlc3RTdGF0dXMgPSAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRSZXF1ZXN0ZWRTdGF0dXMoKSA6dm9pZCB7XG4gICAgICAgIHRoaXMucmVxdWVzdFN0YXR1cyA9IDI7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEltYWdlKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSA6dm9pZCB7XG4gICAgICAgIHRoaXMub3RoZXJMYXllcnMucHVzaChpbWFnZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEltYWdlcygpIDpBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm90aGVyTGF5ZXJzLmxlbmd0aCA/IHRoaXMub3RoZXJMYXllcnMgOiBudWxsO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGlsZS50cyIsImV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgbm9kZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIHN0YXRlOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yIChzb3VyY2U6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICB0aGlzLl9pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aGlzLl9pbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNvdXJjZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQgKCkgOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAxO1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsndG9wJywgJy0xMDAwMHB4J10sXG4gICAgICAgICAgICAgICAgWydsZWZ0JywgJy0xMDAwMHB4J10sXG4gICAgICAgICAgICAgICAgWyd3aWR0aCcsICcxcHgnXSxcbiAgICAgICAgICAgICAgICBbJ2hlaWdodCcsICcxcHgnXSxcbiAgICAgICAgICAgICAgICBbJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJ10sXG4gICAgICAgICAgICAgICAgWydvdmVyZmxvdycsICdoaWRkZW4nXVxuICAgICAgICAgICAgXS5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW3ZbMF1dID0gdlsxXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5faW1hZ2UpO1xuXG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHRoaXMuaW1hZ2Uub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5pbWFnZS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhudWxsLCBlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDM7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHdpZHRoKCkgOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGhlaWdodCgpIDpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaW1hZ2UoKSA6SFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ltYWdlLWxvYWRlci50cyIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5leHBvcnQgY2xhc3MgUG9pbnQge1xuICAgIHB1YmxpYyB4OiBudW1iZXI7XG4gICAgcHVibGljIHk6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XG4gICAgcHJpdmF0ZSB4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgeTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGR4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZHk6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBjYW1lcmFXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgY2FtZXJhSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtYXBXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFwSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB0aWxlV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIHRpbGVIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHRpbWVyOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgaXNNb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGRyYXc6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBhbmltYXRpb25FbmQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBzdGVwOiBudW1iZXIgPSAwLjQ7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIGNhbWVyYVdpZHRoOiBudW1iZXIsXG4gICAgICAgIGNhbWVyYUhlaWdodDogbnVtYmVyLFxuICAgICAgICBtYXBXaWR0aDogbnVtYmVyLFxuICAgICAgICBtYXBIZWlnaHQ6IG51bWJlcixcbiAgICAgICAgdGlsZVdpZHRoOiBudW1iZXIsXG4gICAgICAgIHRpbGVIZWlnaHQ6IG51bWJlclxuICAgICkge1xuICAgICAgICB0aGlzLmNhbWVyYVdpZHRoID0gY2FtZXJhV2lkdGg7XG4gICAgICAgIHRoaXMuY2FtZXJhSGVpZ2h0ID0gY2FtZXJhSGVpZ2h0O1xuICAgICAgICB0aGlzLm1hcFdpZHRoID0gbWFwV2lkdGg7XG4gICAgICAgIHRoaXMubWFwSGVpZ2h0ID0gbWFwSGVpZ2h0O1xuICAgICAgICB0aGlzLnRpbGVXaWR0aCA9IHRpbGVXaWR0aDtcbiAgICAgICAgdGhpcy50aWxlSGVpZ2h0ID0gdGlsZUhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluZGV4KHZhbHVlOiBudW1iZXIsIHNpemU6IG51bWJlcikgOm51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGguYWJzKHZhbHVlKSAvIHNpemUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaWxlcygpIDpBcnJheTxQb2ludD4ge1xuICAgICAgICBsZXQgYXJyOiBBcnJheTxQb2ludD4gPSBbXTtcbiAgICAgICAgbGV0IHR3ID0gdGhpcy50aWxlV2lkdGg7XG4gICAgICAgIGxldCB0aCA9IHRoaXMudGlsZUhlaWdodDtcbiAgICAgICAgbGV0IGluZGV4WDogbnVtYmVyID0gdGhpcy5nZXRJbmRleCh0aGlzLmR4ICogKC0xKSwgdHcpO1xuICAgICAgICBsZXQgaW5kZXhZOiBudW1iZXIgPSB0aGlzLmdldEluZGV4KHRoaXMuZHkgKiAoLTEpLCB0aCk7XG4gICAgICAgIGxldCBzdGFydFggPSBpbmRleFggKiB0dztcbiAgICAgICAgbGV0IHN0YXJ0WSA9IGluZGV4WSAqIHRoO1xuICAgICAgICBsZXQgbm9ybWFsaXplZFggPSBNYXRoLmFicyh0aGlzLmR4KTtcbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRZID0gTWF0aC5hYnModGhpcy5keSk7XG5cbiAgICAgICAgZm9yIChsZXQgX3kgPSBzdGFydFk7IF95IDwgbm9ybWFsaXplZFkgKyB0aGlzLmNhbWVyYUhlaWdodDsgX3kgKz0gdGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IF94ID0gc3RhcnRYOyBfeCA8IG5vcm1hbGl6ZWRYICsgdGhpcy5jYW1lcmFXaWR0aDsgX3ggKz0gdHcpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChuZXcgUG9pbnQodGhpcy5nZXRJbmRleChfeCwgdHcpLCB0aGlzLmdldEluZGV4KF95LCB0aCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBYKCkgOm51bWJlciB7IHJldHVybiB0aGlzLmR4IH1cbiAgICBwdWJsaWMgZ2V0IFkoKSA6bnVtYmVyIHsgcmV0dXJuIHRoaXMuZHkgfVxuXG4gICAgcHVibGljIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikgOnZvaWQge1xuICAgICAgICB0aGlzLmNhbWVyYVdpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FtZXJhSGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMuY29ycmVjdFBvc2l0aW9uKHRoaXMueCwgdGhpcy5jYW1lcmFXaWR0aCAtIHRoaXMubWFwV2lkdGgpO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmNvcnJlY3RQb3NpdGlvbih0aGlzLnksIHRoaXMuY2FtZXJhSGVpZ2h0IC0gdGhpcy5tYXBIZWlnaHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29ycmVjdE1pblBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIDpudW1iZXIge1xuICAgICAgICBpZiAodmFsdWUgPiAwKSB7IHZhbHVlID0gMDsgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb3JyZWN0UG9zaXRpb24odmFsdWUgOm51bWJlciwgbWF4VmFsdWU6IG51bWJlcikgOm51bWJlciB7XG4gICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gdGhpcy5jb3JyZWN0TWluUG9zaXRpb24odmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgPCBtYXhWYWx1ZSkgeyB2YWx1ZSA9IG1heFZhbHVlOyB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFuaW1hdGlvbigpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG5cbiAgICAgICAgbGV0IGR4ID0gKHRoaXMueCAtIHRoaXMuZHgpICogdGhpcy5zdGVwO1xuICAgICAgICBsZXQgZHkgPSAodGhpcy55IC0gdGhpcy5keSkgKiB0aGlzLnN0ZXA7XG5cbiAgICAgICAgZHggPSBNYXRoLmZsb29yKGR4KTtcbiAgICAgICAgZHkgPSBNYXRoLmZsb29yKGR5KTtcblxuICAgICAgICB0aGlzLmR4ICs9IGR4O1xuICAgICAgICB0aGlzLmR5ICs9IGR5O1xuXG4gICAgICAgIHRoaXMuZHJhdy5uZXh0KCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkeCkgPCAwLjAwMSAmJiBNYXRoLmFicyhkeSkgPCAwLjAwMSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZC5uZXh0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmFuaW1hdGlvbigpOyB9LCAzMCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkcmF3RXZlbnQoKSA6U3ViamVjdDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhdztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGFuaW1hdGlvbkVuZEV2ZW50KCkgOlN1YmplY3Q8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbkVuZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpIDp2b2lkIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLmR4ID0gdGhpcy54O1xuICAgICAgICB0aGlzLmR5ID0gdGhpcy55O1xuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSA6dm9pZCB7XG4gICAgICAgIHRoaXMueCA9IHRoaXMuY29ycmVjdFBvc2l0aW9uKHRoaXMueCArIHgsIHRoaXMuY2FtZXJhV2lkdGggLSB0aGlzLm1hcFdpZHRoKTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5jb3JyZWN0UG9zaXRpb24odGhpcy55ICsgeSwgdGhpcy5jYW1lcmFIZWlnaHQgLSB0aGlzLm1hcEhlaWdodCk7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykgeyB0aGlzLmFuaW1hdGlvbigpOyB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoaW5kZXhYOiBudW1iZXIsIGluZGV4WTogbnVtYmVyKSA6dm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhcnRQb3NpdGlvbihpbmRleFgsIGluZGV4WSwgdHJ1ZSk7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykgeyB0aGlzLmFuaW1hdGlvbigpOyB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0YXJ0UG9zaXRpb24oaW5kZXhYOiBudW1iZXIsIGluZGV4WTogbnVtYmVyLCBhbmltYXRpb246IGJvb2xlYW4gPSBmYWxzZSkgOnZvaWQge1xuICAgICAgICBsZXQgeCA9ICgwIC0gaW5kZXhYICogdGhpcy50aWxlV2lkdGgpICsgdGhpcy5jYW1lcmFXaWR0aCAvIDIgLSB0aGlzLnRpbGVXaWR0aCAvIDI7XG4gICAgICAgIGxldCB5ID0gKDAgLSBpbmRleFkgKiB0aGlzLnRpbGVIZWlnaHQpICsgdGhpcy5jYW1lcmFIZWlnaHQgLyAyIC0gdGhpcy50aWxlSGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5jb3JyZWN0UG9zaXRpb24oeCwgdGhpcy5jYW1lcmFXaWR0aCAtIHRoaXMubWFwV2lkdGgpO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmNvcnJlY3RQb3NpdGlvbih5LCB0aGlzLmNhbWVyYUhlaWdodCAtIHRoaXMubWFwSGVpZ2h0KTtcblxuICAgICAgICBpZiAoIWFuaW1hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5keCA9IHRoaXMueDtcbiAgICAgICAgICAgIHRoaXMuZHkgPSB0aGlzLnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW5kZXhPZlRpbGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIDpQb2ludCB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5nZXRJbmRleCh0aGlzLnggKiAoLTEpICsgeCwgdGhpcy50aWxlV2lkdGgpLCB0aGlzLmdldEluZGV4KHRoaXMueSAqICgtMSkgKyB5LCB0aGlzLnRpbGVIZWlnaHQpKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2FtZXJhLnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdlFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3ZLQTtBQUFBOzs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBOEJBO0FBMUJBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQWxaQTs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3JhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3ZDQTtBQWNBO0FBSkE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBeEVBOzs7Ozs7Ozs7O0FDQUE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFsRUE7Ozs7Ozs7Ozs7QUNBQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBUEE7QUFTQTtBQWlCQTtBQWhCQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBOzs7QUFBQTtBQUNBO0FBQUE7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBOUlBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=
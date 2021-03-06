"use strict";

function _classCallCheck(e, n) { if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function") }

function _defineProperties(e, n) {
    for (var t = 0; t < n.length; t++) {
        var r = n[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
    }
}

function _createClass(e, n, t) { return n && _defineProperties(e.prototype, n), t && _defineProperties(e, t), e }

function _extends() { return (_extends = Object.assign || function(e) { for (var n = 1; n < arguments.length; n++) { var t = arguments[n]; for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]) } return e }).apply(this, arguments) }

function _inherits(e, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(n && n.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), n && _setPrototypeOf(e, n)
}

function _getPrototypeOf(e) { return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) { return e.__proto__ || Object.getPrototypeOf(e) })(e) }

function _setPrototypeOf(e, n) { return (_setPrototypeOf = Object.setPrototypeOf || function(e, n) { return e.__proto__ = n, e })(e, n) }

function _isNativeReflectConstruct() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0 } catch (e) { return !1 } }

function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e }

function _possibleConstructorReturn(e, n) { return !n || "object" != typeof n && "function" != typeof n ? _assertThisInitialized(e) : n }

function _createSuper(t) { var r = _isNativeReflectConstruct(); return function() { var e, n = _getPrototypeOf(t); return _possibleConstructorReturn(this, r ? (e = _getPrototypeOf(this).constructor, Reflect.construct(n, arguments, e)) : n.apply(this, arguments)) } }
var Connector = function() {
        function n(e) { _classCallCheck(this, n), this._defaultOptions = { auth: { headers: {} }, authEndpoint: "/broadcasting/auth", broadcaster: "pusher", csrfToken: null, host: null, key: null, namespace: "App.Events" }, this.setOptions(e), this.connect() }
        return _createClass(n, [{ key: "setOptions", value: function(e) { return this.options = _extends(this._defaultOptions, e), this.csrfToken() && (this.options.auth.headers["X-CSRF-TOKEN"] = this.csrfToken()), e } }, { key: "csrfToken", value: function() { var e; return "undefined" != typeof window && window.Laravel && window.Laravel.csrfToken ? window.Laravel.csrfToken : this.options.csrfToken ? this.options.csrfToken : "undefined" != typeof document && "function" == typeof document.querySelector && (e = document.querySelector('meta[name="csrf-token"]')) ? e.getAttribute("content") : null } }]), n
    }(),
    Channel = function() {
        function e() { _classCallCheck(this, e) }
        return _createClass(e, [{ key: "listenForWhisper", value: function(e, n) { return this.listen(".client-" + e, n) } }, { key: "notification", value: function(e) { return this.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", e) } }, { key: "stopListeningForWhisper", value: function(e) { return this.stopListening(".client-" + e) } }]), e
    }(),
    EventFormatter = function() {
        function n(e) { _classCallCheck(this, n), this.setNamespace(e) }
        return _createClass(n, [{ key: "format", value: function(e) { return "." === e.charAt(0) || "\\" === e.charAt(0) ? e.substr(1) : (this.namespace && (e = this.namespace + "." + e), e.replace(/\./g, "\\")) } }, { key: "setNamespace", value: function(e) { this.namespace = e } }]), n
    }(),
    PusherChannel = function() {
        _inherits(s, Channel);
        var i = _createSuper(s);

        function s(e, n, t) { var r; return _classCallCheck(this, s), (r = i.call(this)).name = n, r.pusher = e, r.options = t, r.eventFormatter = new EventFormatter(r.options.namespace), r.subscribe(), r }
        return _createClass(s, [{ key: "subscribe", value: function() { this.subscription = this.pusher.subscribe(this.name) } }, { key: "unsubscribe", value: function() { this.pusher.unsubscribe(this.name) } }, { key: "listen", value: function(e, n) { return this.on(this.eventFormatter.format(e), n), this } }, { key: "stopListening", value: function(e) { return this.subscription.unbind(this.eventFormatter.format(e)), this } }, { key: "subscribed", value: function(e) { return this.on("pusher:subscription_succeeded", function() { e() }), this } }, { key: "error", value: function(n) { return this.on("pusher:subscription_error", function(e) { n(e) }), this } }, { key: "on", value: function(e, n) { return this.subscription.bind(e, n), this } }]), s
    }(),
    PusherPrivateChannel = function() {
        _inherits(n, PusherChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "whisper", value: function(e, n) { return this.pusher.channels.channels[this.name].trigger("client-".concat(e), n), this } }]), n
    }(),
    PusherEncryptedPrivateChannel = function() {
        _inherits(n, PusherChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "whisper", value: function(e, n) { return this.pusher.channels.channels[this.name].trigger("client-".concat(e), n), this } }]), n
    }(),
    PusherPresenceChannel = function() {
        _inherits(n, PusherChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "here", value: function(e) { return this.on("pusher:subscription_succeeded", function(n) { e(Object.keys(n.members).map(function(e) { return n.members[e] })) }), this } }, { key: "joining", value: function(n) { return this.on("pusher:member_added", function(e) { n(e.info) }), this } }, { key: "leaving", value: function(n) { return this.on("pusher:member_removed", function(e) { n(e.info) }), this } }, { key: "whisper", value: function(e, n) { return this.pusher.channels.channels[this.name].trigger("client-".concat(e), n), this } }]), n
    }(),
    SocketIoChannel = function() {
        _inherits(s, Channel);
        var i = _createSuper(s);

        function s(e, n, t) { var r; return _classCallCheck(this, s), (r = i.call(this)).events = {}, r.name = n, r.socket = e, r.options = t, r.eventFormatter = new EventFormatter(r.options.namespace), r.subscribe(), r.configureReconnector(), r }
        return _createClass(s, [{ key: "subscribe", value: function() { this.socket.emit("subscribe", { channel: this.name, auth: this.options.auth || {} }) } }, { key: "unsubscribe", value: function() { this.unbind(), this.socket.emit("unsubscribe", { channel: this.name, auth: this.options.auth || {} }) } }, { key: "listen", value: function(e, n) { return this.on(this.eventFormatter.format(e), n), this } }, { key: "stopListening", value: function(e) { var n = this.eventFormatter.format(e); return this.socket.removeListener(n), delete this.events[n], this } }, { key: "subscribed", value: function(n) { return this.on("connect", function(e) { n(e) }), this } }, { key: "error", value: function() { return this } }, {
            key: "on",
            value: function(e, t) {
                function n(e, n) { r.name == e && t(n) }
                var r = this;
                this.socket.on(e, n), this.bind(e, n)
            }
        }, {
            key: "configureReconnector",
            value: function() {
                function e() { n.subscribe() }
                var n = this;
                this.socket.on("reconnect", e), this.bind("reconnect", e)
            }
        }, { key: "bind", value: function(e, n) { this.events[e] = this.events[e] || [], this.events[e].push(n) } }, {
            key: "unbind",
            value: function() {
                var t = this;
                Object.keys(this.events).forEach(function(n) { t.events[n].forEach(function(e) { t.socket.removeListener(n, e) }), delete t.events[n] })
            }
        }]), s
    }(),
    SocketIoPrivateChannel = function() {
        _inherits(n, SocketIoChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "whisper", value: function(e, n) { return this.socket.emit("client event", { channel: this.name, event: "client-".concat(e), data: n }), this } }]), n
    }(),
    SocketIoPresenceChannel = function() {
        _inherits(n, SocketIoPrivateChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "here", value: function(n) { return this.on("presence:subscribed", function(e) { n(e.map(function(e) { return e.user_info })) }), this } }, { key: "joining", value: function(n) { return this.on("presence:joining", function(e) { return n(e.user_info) }), this } }, { key: "leaving", value: function(n) { return this.on("presence:leaving", function(e) { return n(e.user_info) }), this } }]), n
    }(),
    NullChannel = function() {
        _inherits(n, Channel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "subscribe", value: function() {} }, { key: "unsubscribe", value: function() {} }, { key: "listen", value: function() { return this } }, { key: "stopListening", value: function() { return this } }, { key: "subscribed", value: function() { return this } }, { key: "error", value: function() { return this } }, { key: "on", value: function() { return this } }]), n
    }(),
    NullPrivateChannel = function() {
        _inherits(n, NullChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "whisper", value: function() { return this } }]), n
    }(),
    NullPresenceChannel = function() {
        _inherits(n, NullChannel);
        var e = _createSuper(n);

        function n() { return _classCallCheck(this, n), e.apply(this, arguments) }
        return _createClass(n, [{ key: "here", value: function() { return this } }, { key: "joining", value: function() { return this } }, { key: "leaving", value: function() { return this } }, { key: "whisper", value: function() { return this } }]), n
    }(),
    PusherConnector = function() {
        _inherits(t, Connector);
        var n = _createSuper(t);

        function t() { var e; return _classCallCheck(this, t), (e = n.apply(this, arguments)).channels = {}, e }
        return _createClass(t, [{ key: "connect", value: function() { void 0 !== this.options.client ? this.pusher = this.options.client : this.pusher = new Pusher(this.options.key, this.options) } }, { key: "listen", value: function(e, n, t) { return this.channel(e).listen(n, t) } }, { key: "channel", value: function(e) { return this.channels[e] || (this.channels[e] = new PusherChannel(this.pusher, e, this.options)), this.channels[e] } }, { key: "privateChannel", value: function(e) { return this.channels["private-" + e] || (this.channels["private-" + e] = new PusherPrivateChannel(this.pusher, "private-" + e, this.options)), this.channels["private-" + e] } }, { key: "encryptedPrivateChannel", value: function(e) { return this.channels["private-encrypted-" + e] || (this.channels["private-encrypted-" + e] = new PusherEncryptedPrivateChannel(this.pusher, "private-encrypted-" + e, this.options)), this.channels["private-encrypted-" + e] } }, { key: "presenceChannel", value: function(e) { return this.channels["presence-" + e] || (this.channels["presence-" + e] = new PusherPresenceChannel(this.pusher, "presence-" + e, this.options)), this.channels["presence-" + e] } }, {
            key: "leave",
            value: function(e) {
                var t = this;
                [e, "private-" + e, "presence-" + e].forEach(function(e, n) { t.leaveChannel(e) })
            }
        }, { key: "leaveChannel", value: function(e) { this.channels[e] && (this.channels[e].unsubscribe(), delete this.channels[e]) } }, { key: "socketId", value: function() { return this.pusher.connection.socket_id } }, { key: "disconnect", value: function() { this.pusher.disconnect() } }]), t
    }(),
    SocketIoConnector = function() {
        _inherits(t, Connector);
        var n = _createSuper(t);

        function t() { var e; return _classCallCheck(this, t), (e = n.apply(this, arguments)).channels = {}, e }
        return _createClass(t, [{ key: "connect", value: function() { var e = this.getSocketIO(); return this.socket = e(this.options.host, this.options), this.socket } }, { key: "getSocketIO", value: function() { if (void 0 !== this.options.client) return this.options.client; if ("undefined" != typeof io) return io; throw new Error("Socket.io client not found. Should be globally available or passed via options.client") } }, { key: "listen", value: function(e, n, t) { return this.channel(e).listen(n, t) } }, { key: "channel", value: function(e) { return this.channels[e] || (this.channels[e] = new SocketIoChannel(this.socket, e, this.options)), this.channels[e] } }, { key: "privateChannel", value: function(e) { return this.channels["private-" + e] || (this.channels["private-" + e] = new SocketIoPrivateChannel(this.socket, "private-" + e, this.options)), this.channels["private-" + e] } }, { key: "presenceChannel", value: function(e) { return this.channels["presence-" + e] || (this.channels["presence-" + e] = new SocketIoPresenceChannel(this.socket, "presence-" + e, this.options)), this.channels["presence-" + e] } }, {
            key: "leave",
            value: function(e) {
                var n = this;
                [e, "private-" + e, "presence-" + e].forEach(function(e) { n.leaveChannel(e) })
            }
        }, { key: "leaveChannel", value: function(e) { this.channels[e] && (this.channels[e].unsubscribe(), delete this.channels[e]) } }, { key: "socketId", value: function() { return this.socket.id } }, { key: "disconnect", value: function() { this.socket.disconnect() } }]), t
    }(),
    NullConnector = function() {
        _inherits(t, Connector);
        var n = _createSuper(t);

        function t() { var e; return _classCallCheck(this, t), (e = n.apply(this, arguments)).channels = {}, e }
        return _createClass(t, [{ key: "connect", value: function() {} }, { key: "listen", value: function() { return new NullChannel } }, { key: "channel", value: function() { return new NullChannel } }, { key: "privateChannel", value: function() { return new NullPrivateChannel } }, { key: "presenceChannel", value: function() { return new NullPresenceChannel } }, { key: "leave", value: function() {} }, { key: "leaveChannel", value: function() {} }, { key: "socketId", value: function() { return "fake-socket-id" } }, { key: "disconnect", value: function() {} }]), t
    }(),
    Echo = function() {
        function n(e) { _classCallCheck(this, n), this.options = e, this.connect(), this.options.withoutInterceptors || this.registerInterceptors() }
        return _createClass(n, [{ key: "channel", value: function(e) { return this.connector.channel(e) } }, { key: "connect", value: function() { "pusher" == this.options.broadcaster ? this.connector = new PusherConnector(this.options) : "socket.io" == this.options.broadcaster ? this.connector = new SocketIoConnector(this.options) : "null" == this.options.broadcaster ? this.connector = new NullConnector(this.options) : "function" == typeof this.options.broadcaster && (this.connector = new this.options.broadcaster(this.options)) } }, { key: "disconnect", value: function() { this.connector.disconnect() } }, { key: "join", value: function(e) { return this.connector.presenceChannel(e) } }, { key: "leave", value: function(e) { this.connector.leave(e) } }, { key: "leaveChannel", value: function(e) { this.connector.leaveChannel(e) } }, { key: "listen", value: function(e, n, t) { return this.connector.listen(e, n, t) } }, { key: "private", value: function(e) { return this.connector.privateChannel(e) } }, { key: "encryptedPrivate", value: function(e) { return this.connector.encryptedPrivateChannel(e) } }, { key: "socketId", value: function() { return this.connector.socketId() } }, { key: "registerInterceptors", value: function() { "function" == typeof Vue && Vue.http && this.registerVueRequestInterceptor(), "function" == typeof axios && this.registerAxiosRequestInterceptor(), "function" == typeof jQuery && this.registerjQueryAjaxSetup() } }, {
            key: "registerVueRequestInterceptor",
            value: function() {
                var t = this;
                Vue.http.interceptors.push(function(e, n) { t.socketId() && e.headers.set("X-Socket-ID", t.socketId()), n() })
            }
        }, {
            key: "registerAxiosRequestInterceptor",
            value: function() {
                var n = this;
                axios.interceptors.request.use(function(e) { return n.socketId() && (e.headers["X-Socket-Id"] = n.socketId()), e })
            }
        }, {
            key: "registerjQueryAjaxSetup",
            value: function() {
                var r = this;
                void 0 !== jQuery.ajax && jQuery.ajaxPrefilter(function(e, n, t) { r.socketId() && t.setRequestHeader("X-Socket-Id", r.socketId()) })
            }
        }]), n
    }();
window.Echo = Echo;

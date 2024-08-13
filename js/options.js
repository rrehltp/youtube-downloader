"use strict";
(self.webpackChunk_addoncrop_youtube_downloader = self.webpackChunk_addoncrop_youtube_downloader || []).push([
    [575],
    {
        1205: (e, t, o) => {
            var a = o(7450),
                l = o(1704),
                n = o(4982),
                i = o(7094),
                d = o(364),
                s = o(4125),
                u = o(4771),
                p = o(7745),
                r = o(3939),
                m = o(8165),
                b = o(9026),
                c = o(3021),
                h = o(4594),
                f = o(2866),
                _ = o(2525),
                g = o(535),
                w = o(28),
                x = o(5157),
                v = o(7305),
                F = o(5916);
            const k = { class: "settings-header" },
                y = (0, v.Lk)("hr", null, null, -1),
                D = (0, v.Lk)("hr", null, null, -1),
                E = (0, v.Lk)("hr", null, null, -1);
            const L = { class: "settings-section settings-general" },
                A = { key: 0, class: "extension-display-settings" },
                V = { class: "extension-display-settings__content" },
                C = { class: "extension-display-settings__action" };
            var B = o(817);
            const T = {
                    compactDisplayModeHeading: __t("optCompactDisplayModeHeading", "Extension is displayed in Compact mode"),
                    compactDisplayModeSubheading: __t("optCompactDisplayModeSubheading", "Extension will be displayed as a compact button on YouTube, Click this button to switch to full mode."),
                    compactDisplayModeButtonText: __t("optCompactDisplayModeButtonText", "Switch"),
                    themeSelectLabel: __t("optThemeSelectLabel", "Choose extension theme"),
                    themeOptionSystemLabel: __t("optThemeOptionSystemLabel", "System default"),
                    themeOptionLightLabel: __t("optThemeOptionLightLabel", "Light theme"),
                    themeOptionDarkLabel: __t("optThemeOptionDarkLabel", "Dark theme"),
                    downloadNotificationsSwitchLabel: __t("optDownloadNotificationsSwitchLabel", "Show download notifications"),
                    embeddedDownloadsSwitchLabel: __t("optEmbeddedDownloadsSwitchLabel", "Show download button on embedded videos"),
                    downloadButtonOnUrlsSwitchLabel: __t("optDownloadButtonOnUrlsSwitchLabel", "Add download button on YouTube links"),
                    videoQualityMenuLabel: __t("optVideoQualityMenuLabel", "Set preferred video playback quality"),
                    videoQualityDisabledOptionLabel: __t("optVideoQualityDisabledOptionLabel", "Disabled"),
                },
                S = (0, v.pM)({
                    name: "GeneralSettings",
                    setup() {
                        const e = (0, B.Kh)({
                            theme: x.A.options.theme,
                            extensionDisplayMode: x.A.options.extensionDisplayMode,
                            preferredVideoPlaybackQuality: x.A.options.preferredVideoPlaybackQuality,
                            showDownloadNotifications: x.A.options.showDownloadNotifications,
                            embeddedDownloadsEnabled: x.A.options.embeddedDownloadsEnabled,
                            downloadButtonOnUrlsEnabled: x.A.options.downloadButtonOnUrlsEnabled,
                        });
                        return (
                            x.A.options.onChange(["theme", "extensionDisplayMode", "preferredVideoPlaybackQuality", "showDownloadNotifications", "embeddedDownloadsEnabled", "downloadButtonOnUrlsEnabled"], (t) => {
                                void 0 !== t.theme && (e.theme = t.theme.newValue),
                                    void 0 !== t.preferredVideoPlaybackQuality && (e.preferredVideoPlaybackQuality = t.preferredVideoPlaybackQuality.newValue),
                                    void 0 !== t.showDownloadNotifications && (e.showDownloadNotifications = t.showDownloadNotifications.newValue),
                                    void 0 !== t.embeddedDownloadsEnabled && (e.embeddedDownloadsEnabled = t.embeddedDownloadsEnabled.newValue),
                                    void 0 !== t.downloadButtonOnUrlsEnabled && (e.downloadButtonOnUrlsEnabled = t.downloadButtonOnUrlsEnabled.newValue),
                                    void 0 !== t.extensionDisplayMode && (e.extensionDisplayMode = t.extensionDisplayMode.newValue);
                            }),
                            { app: x.A, locale: T, options: e }
                        );
                    },
                });
            var M = o(3726);
            const U = (0, M.A)(S, [
                    [
                        "render",
                        function (e, t, o, l, n, i) {
                            const d = (0, v.g2)("s-button"),
                                s = (0, v.g2)("select-option"),
                                u = (0, v.g2)("select-menu"),
                                p = (0, v.g2)("form-item"),
                                r = (0, v.g2)("column"),
                                m = (0, v.g2)("row"),
                                b = (0, v.g2)("switch-button");
                            return (
                                (0, v.uX)(),
                                (0, v.CE)("section", L, [
                                    "compact" === e.options.extensionDisplayMode
                                        ? ((0, v.uX)(),
                                          (0, v.CE)("div", A, [
                                              (0, v.Lk)("div", V, [(0, v.Lk)("h5", null, (0, F.v_)(e.locale.compactDisplayModeHeading), 1), (0, v.Lk)("p", null, (0, F.v_)(e.locale.compactDisplayModeSubheading), 1)]),
                                              (0, v.Lk)("div", C, [
                                                  (0, v.bF)(
                                                      d,
                                                      { type: "primary", onClick: t[0] || (t[0] = (0, a.D$)((t) => e.app.options.set("extensionDisplayMode", "full"), ["prevent"])) },
                                                      { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.compactDisplayModeButtonText), 1)]), _: 1 }
                                                  ),
                                              ]),
                                          ]))
                                        : (0, v.Q3)("v-if", !0),
                                    (0, v.bF)(m, null, {
                                        default: (0, v.k6)(() => [
                                            (0, v.bF)(
                                                r,
                                                { xs: 12, sm: 4, md: 3 },
                                                {
                                                    default: (0, v.k6)(() => [
                                                        (0, v.bF)(
                                                            p,
                                                            { label: e.locale.themeSelectLabel },
                                                            {
                                                                default: (0, v.k6)(() => [
                                                                    (0, v.bF)(
                                                                        u,
                                                                        { modelValue: e.options.theme, "onUpdate:modelValue": t[1] || (t[1] = (t) => (e.options.theme = t)), onChange: t[2] || (t[2] = (t) => e.app.options.set("theme", t)) },
                                                                        {
                                                                            default: (0, v.k6)(() => [
                                                                                (0, v.bF)(s, { value: "system", label: e.locale.themeOptionSystemLabel }, null, 8, ["label"]),
                                                                                (0, v.bF)(s, { value: "light", label: e.locale.themeOptionLightLabel }, null, 8, ["label"]),
                                                                                (0, v.bF)(s, { value: "dark", label: e.locale.themeOptionDarkLabel }, null, 8, ["label"]),
                                                                            ]),
                                                                            _: 1,
                                                                        },
                                                                        8,
                                                                        ["modelValue"]
                                                                    ),
                                                                ]),
                                                                _: 1,
                                                            },
                                                            8,
                                                            ["label"]
                                                        ),
                                                    ]),
                                                    _: 1,
                                                }
                                            ),
                                        ]),
                                        _: 1,
                                    }),
                                    (0, v.bF)(m, null, {
                                        default: (0, v.k6)(() => [
                                            (0, v.bF)(
                                                r,
                                                { xs: 12, sm: 4, md: 3 },
                                                {
                                                    default: (0, v.k6)(() => [
                                                        (0, v.bF)(
                                                            p,
                                                            { label: e.locale.videoQualityMenuLabel },
                                                            {
                                                                default: (0, v.k6)(() => [
                                                                    (0, v.bF)(
                                                                        u,
                                                                        {
                                                                            modelValue: e.options.preferredVideoPlaybackQuality,
                                                                            "onUpdate:modelValue": t[3] || (t[3] = (t) => (e.options.preferredVideoPlaybackQuality = t)),
                                                                            onChange: t[4] || (t[4] = (t) => e.app.options.set("preferredVideoPlaybackQuality", t)),
                                                                        },
                                                                        {
                                                                            default: (0, v.k6)(() => [
                                                                                (0, v.bF)(s, { value: "disabled", label: e.locale.videoQualityDisabledOptionLabel }, null, 8, ["label"]),
                                                                                (0, v.bF)(s, { value: "tiny", label: "144p" }),
                                                                                (0, v.bF)(s, { value: "small", label: "240p" }),
                                                                                (0, v.bF)(s, { value: "medium", label: "360p" }),
                                                                                (0, v.bF)(s, { value: "large", label: "480p" }),
                                                                                (0, v.bF)(s, { value: "hd720", label: "720p" }),
                                                                                (0, v.bF)(s, { value: "hd1080", label: "1080p" }),
                                                                                (0, v.bF)(s, { value: "hd1440", label: "1440p" }),
                                                                                (0, v.bF)(s, { value: "hd2160", label: "2160p (4K)" }),
                                                                                (0, v.bF)(s, { value: "highres", label: "4320p (8K)" }),
                                                                            ]),
                                                                            _: 1,
                                                                        },
                                                                        8,
                                                                        ["modelValue"]
                                                                    ),
                                                                ]),
                                                                _: 1,
                                                            },
                                                            8,
                                                            ["label"]
                                                        ),
                                                    ]),
                                                    _: 1,
                                                }
                                            ),
                                        ]),
                                        _: 1,
                                    }),
                                    (0, v.bF)(
                                        p,
                                        { style: { "margin-top": "1rem" } },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    b,
                                                    {
                                                        modelValue: e.options.showDownloadNotifications,
                                                        "onUpdate:modelValue": t[5] || (t[5] = (t) => (e.options.showDownloadNotifications = t)),
                                                        onChange: t[6] || (t[6] = (t) => e.app.options.set("showDownloadNotifications", t)),
                                                    },
                                                    { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.downloadNotificationsSwitchLabel), 1)]), _: 1 },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    (0, v.bF)(
                                        p,
                                        { style: { "margin-top": "1rem" } },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    b,
                                                    {
                                                        modelValue: e.options.embeddedDownloadsEnabled,
                                                        "onUpdate:modelValue": t[7] || (t[7] = (t) => (e.options.embeddedDownloadsEnabled = t)),
                                                        onChange: t[8] || (t[8] = (t) => e.app.options.set("embeddedDownloadsEnabled", t)),
                                                    },
                                                    { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.embeddedDownloadsSwitchLabel), 1)]), _: 1 },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    (0, v.bF)(
                                        p,
                                        { style: { "margin-top": "1rem" } },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    b,
                                                    {
                                                        modelValue: e.options.downloadButtonOnUrlsEnabled,
                                                        "onUpdate:modelValue": t[9] || (t[9] = (t) => (e.options.downloadButtonOnUrlsEnabled = t)),
                                                        onChange: t[10] || (t[10] = (t) => e.app.options.set("downloadButtonOnUrlsEnabled", t)),
                                                    },
                                                    { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.downloadButtonOnUrlsSwitchLabel), 1)]), _: 1 },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                ])
                            );
                        },
                    ],
                ]),
                W = { class: "settings-section settings-download" },
                O = { class: "settings-section__heading" };
            const I = {
                    heading: __t("optDownloadSettingsHeading", "Downloader settings"),
                    formatsLabel: __t("optFormatsLabel", "Video formats to show in download menu"),
                    dashFormatsLabel: __t("optDashFormatsLabel", "Dash formats to show in download menu"),
                    dashFormatsRadioNone: __t("optDashFormatsRadioNone", "None"),
                    dashFormatsRadioBoth: __t("optDashFormatsRadioBoth", "Audio and Video"),
                    dashFormatsRadioVideo: __t("optDashFormatsRadioVideo", "Video only"),
                    dashFormatsRadioAudio: __t("optDashFormatsRadioAudio", "Audio only"),
                    mp3BitrateLabel: __t("optMp3BitrateLabel", "MP3 converter default bitrate"),
                    copyButtonSwitchLabel: __t("optCopyButtonSwitchLabel", "Enable copy to clipboard button"),
                    qrButtonSwitchLabel: __t("optQrButtonSwitchLabel", "Enable QR code generator button"),
                    saveAsSwitchLabel: __t("optSaveAsSwitchLabel", "Show save-as dialog box when I choose to download a video"),
                },
                Q = (0, v.pM)({
                    name: "DownloadSettings",
                    setup() {
                        const e = (0, B.Kh)({
                            formats: x.A.options.formats,
                            dashFormats: x.A.options.dashFormats,
                            mp3DefaultBitrate: x.A.options.mp3DefaultBitrate,
                            copyToClipboardButtonEnabled: x.A.options.copyToClipboardButtonEnabled,
                            qrGeneratorButtonEnabled: x.A.options.qrGeneratorButtonEnabled,
                            saveAsDialogEnabled: x.A.options.saveAsDialogEnabled,
                        });
                        return (
                            x.A.options.onChange(["formats", "dashFormats", "mp3DefaultBitrate", "copyToClipboardButtonEnabled", "qrGeneratorButtonEnabled", "saveAsDialogEnabled"], (t) => {
                                void 0 !== t.formats && (e.formats = t.formats.newValue),
                                    void 0 !== t.dashFormats && (e.dashFormats = t.dashFormats.newValue),
                                    void 0 !== t.mp3DefaultBitrate && (e.mp3DefaultBitrate = t.mp3DefaultBitrate.newValue),
                                    void 0 !== t.copyToClipboardButtonEnabled && (e.copyToClipboardButtonEnabled = t.copyToClipboardButtonEnabled.newValue),
                                    void 0 !== t.qrGeneratorButtonEnabled && (e.qrGeneratorButtonEnabled = t.qrGeneratorButtonEnabled.newValue),
                                    void 0 !== t.saveAsDialogEnabled && (e.saveAsDialogEnabled = t.saveAsDialogEnabled.newValue);
                            }),
                            { locale: I, app: x.A, options: e }
                        );
                    },
                }),
                R = (0, M.A)(Q, [
                    [
                        "render",
                        function (e, t, o, a, l, n) {
                            const i = (0, v.g2)("checkbox"),
                                d = (0, v.g2)("checkbox-group"),
                                s = (0, v.g2)("form-item"),
                                u = (0, v.g2)("radio"),
                                p = (0, v.g2)("radio-group"),
                                r = (0, v.g2)("switch-button");
                            return (
                                (0, v.uX)(),
                                (0, v.CE)("section", W, [
                                    (0, v.Lk)("h3", O, (0, F.v_)(e.locale.heading), 1),
                                    (0, v.bF)(
                                        s,
                                        { label: e.locale.formatsLabel },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    d,
                                                    {
                                                        modelValue: e.options.formats,
                                                        "onUpdate:modelValue": t[0] || (t[0] = (t) => (e.options.formats = t)),
                                                        type: "inline",
                                                        onChange: t[1] || (t[1] = (t) => e.app.options.set("formats", t.flat())),
                                                    },
                                                    {
                                                        default: (0, v.k6)(() => [
                                                            (0, v.bF)(i, { value: "mp4", disabled: "" }, { default: (0, v.k6)(() => [(0, v.eW)(" MP4 ")]), _: 1 }),
                                                            (0, v.bF)(i, { value: "m4a" }, { default: (0, v.k6)(() => [(0, v.eW)(" M4A ")]), _: 1 }),
                                                            (0, v.bF)(i, { value: "webm" }, { default: (0, v.k6)(() => [(0, v.eW)(" WEBM ")]), _: 1 }),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["label"]
                                    ),
                                    (0, v.bF)(
                                        s,
                                        { label: e.locale.dashFormatsLabel },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    p,
                                                    {
                                                        modelValue: e.options.dashFormats,
                                                        "onUpdate:modelValue": t[2] || (t[2] = (t) => (e.options.dashFormats = t)),
                                                        type: "inline",
                                                        onChange: t[3] || (t[3] = (t) => e.app.options.set("dashFormats", t)),
                                                    },
                                                    {
                                                        default: (0, v.k6)(() => [
                                                            (0, v.bF)(u, { value: "none" }, { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.dashFormatsRadioNone), 1)]), _: 1 }),
                                                            (0, v.bF)(u, { value: "both" }, { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.dashFormatsRadioBoth), 1)]), _: 1 }),
                                                            (0, v.bF)(u, { value: "video" }, { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.dashFormatsRadioVideo), 1)]), _: 1 }),
                                                            (0, v.bF)(u, { value: "audio" }, { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.dashFormatsRadioAudio), 1)]), _: 1 }),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["label"]
                                    ),
                                    (0, v.bF)(
                                        s,
                                        { label: e.locale.mp3BitrateLabel },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    p,
                                                    {
                                                        modelValue: e.options.mp3DefaultBitrate,
                                                        "onUpdate:modelValue": t[4] || (t[4] = (t) => (e.options.mp3DefaultBitrate = t)),
                                                        type: "inline",
                                                        onChange: t[5] || (t[5] = (t) => e.app.options.set("mp3DefaultBitrate", t)),
                                                    },
                                                    {
                                                        default: (0, v.k6)(() => [
                                                            (0, v.bF)(u, { value: 320 }, { default: (0, v.k6)(() => [(0, v.eW)(" 320Kbps ")]), _: 1 }),
                                                            (0, v.bF)(u, { value: 256 }, { default: (0, v.k6)(() => [(0, v.eW)(" 256Kbps ")]), _: 1 }),
                                                            (0, v.bF)(u, { value: 192 }, { default: (0, v.k6)(() => [(0, v.eW)(" 192Kbps ")]), _: 1 }),
                                                            (0, v.bF)(u, { value: 128 }, { default: (0, v.k6)(() => [(0, v.eW)(" 128Kbps ")]), _: 1 }),
                                                            (0, v.bF)(u, { value: 64 }, { default: (0, v.k6)(() => [(0, v.eW)(" 64Kbps ")]), _: 1 }),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["label"]
                                    ),
                                    (0, v.bF)(s, null, {
                                        default: (0, v.k6)(() => [
                                            (0, v.bF)(
                                                r,
                                                {
                                                    modelValue: e.options.copyToClipboardButtonEnabled,
                                                    "onUpdate:modelValue": t[6] || (t[6] = (t) => (e.options.copyToClipboardButtonEnabled = t)),
                                                    onChange: t[7] || (t[7] = (t) => e.app.options.set("copyToClipboardButtonEnabled", t)),
                                                },
                                                { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.copyButtonSwitchLabel), 1)]), _: 1 },
                                                8,
                                                ["modelValue"]
                                            ),
                                        ]),
                                        _: 1,
                                    }),
                                    (0, v.bF)(s, null, {
                                        default: (0, v.k6)(() => [
                                            (0, v.bF)(
                                                r,
                                                {
                                                    modelValue: e.options.qrGeneratorButtonEnabled,
                                                    "onUpdate:modelValue": t[8] || (t[8] = (t) => (e.options.qrGeneratorButtonEnabled = t)),
                                                    onChange: t[9] || (t[9] = (t) => e.app.options.set("qrGeneratorButtonEnabled", t)),
                                                },
                                                { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.qrButtonSwitchLabel), 1)]), _: 1 },
                                                8,
                                                ["modelValue"]
                                            ),
                                        ]),
                                        _: 1,
                                    }),
                                    (0, v.bF)(s, null, {
                                        default: (0, v.k6)(() => [
                                            (0, v.bF)(
                                                r,
                                                {
                                                    modelValue: e.options.saveAsDialogEnabled,
                                                    "onUpdate:modelValue": t[10] || (t[10] = (t) => (e.options.saveAsDialogEnabled = t)),
                                                    onChange: t[11] || (t[11] = (t) => e.app.options.set("saveAsDialogEnabled", t)),
                                                },
                                                { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.saveAsSwitchLabel), 1)]), _: 1 },
                                                8,
                                                ["modelValue"]
                                            ),
                                        ]),
                                        _: 1,
                                    }),
                                ])
                            );
                        },
                    ],
                ]),
                P = { class: "settings-section settings-flixmate" },
                H = { class: "settings-section__heading" },
                N = { key: 0 },
                G = { href: "#" },
                q = { key: 1 },
                K = { key: 0, href: "#" },
                X = { key: 2 };
            const $ = {
                    heading: __t("optFlixmateSettingsHeading", "Flixmate Media Downloader"),
                    unsupportedText: __t("optFlixmateUnsupportedText", "Flixmate is not supported on your system."),
                    unsupportedLinkText: __t("optFlixmateUnsupportedLinkText", "Learn more"),
                    disconnectedText: __t("optFlixmateDisconnectedText", "Flixmate is not connected."),
                    disconnectedLinkText: __t("optDisconnectedLinkText", "Download"),
                    connectedText: __t("optFlixmateConnectedText", "is connected."),
                    updateAvailableText: __t("optFlixmateUpdateAvailableText", "Update available for "),
                    installUpdateButtonText: __t("optFlixmateInstallUpdateText", "Click here"),
                    installUpdateText: __t("optFlixmateInstallUpdateText", "to install."),
                    enabledSwitchLabel: __t("optFlixmateEnabledSwitchLabel", "Enable Flixmate Media Downloader"),
                    enabledSwitchHelpText: __t("optFlixmateEnabledSwitchHelpText", "Download Unlimited MP3 and Ultra HD formats"),
                    formatsLabel: __t("optFlixmateFormatsLabel", "Conversion formats to show in downloads menu"),
                    multithreadingSwitchLabel: __t("optMultithreadingSwitchLabel", "Use Multi Threading for Downloads"),
                    multithreadingSwitchHelpText: __t("optMultithreadingSwitchHelpText", "Download files with multiple connections to the server to increase the download speed."),
                },
                Y = (0, v.pM)({
                    name: "GeneralSettings",
                    setup() {
                        const e = (0, B.Kh)({ enabled: x.A.options.flixmateEnabled, formats: x.A.options.flixmateFormats, useMultithreading: x.A.options.flixmateUseMultithreading });
                        x.A.options.onChange(["flixmateEnabled", "flixmateFormats", "flixmateUseMultithreading"], (t) => {
                            void 0 !== t.flixmateEnabled && (e.enabled = t.flixmateEnabled.newValue),
                                void 0 !== t.flixmateFormats && (e.formats = t.flixmateFormats.newValue),
                                void 0 !== t.flixmateUseMultithreading && (e.useMultithreading = t.flixmateUseMultithreading.newValue);
                        });
                        const t = (0, B.KR)(null);
                        return (
                            x.A.message.send("background.flixmate.get-info").then((e) => {
                                e && !e.error && e.data && (t.value = e.data);
                            }),
                            x.A.options.onChange("flixmateEnabled", () => {
                                setTimeout(() => {
                                    x.A.message.send("background.flixmate.get-info").then((e) => {
                                        e && !e.error && e.data && (t.value = e.data);
                                    });
                                }, 1e3);
                            }),
                            { app: x.A, locale: $, options: e, flixmateInfo: t }
                        );
                    },
                }),
                z = (0, M.A)(Y, [
                    [
                        "render",
                        function (e, t, o, a, l, n) {
                            const i = (0, v.g2)("icon"),
                                d = (0, v.g2)("switch-button"),
                                s = (0, v.g2)("form-item"),
                                u = (0, v.g2)("checkbox"),
                                p = (0, v.g2)("checkbox-group");
                            return (
                                (0, v.uX)(),
                                (0, v.CE)("section", P, [
                                    (0, v.Lk)("h3", H, [
                                        (0, v.eW)((0, F.v_)(e.locale.heading) + " ", 1),
                                        null !== e.flixmateInfo
                                            ? ((0, v.uX)(),
                                              (0, v.CE)(
                                                  v.FK,
                                                  { key: 0 },
                                                  [
                                                      e.flixmateInfo.isSupported
                                                          ? e.flixmateInfo.isConnected
                                                              ? e.flixmateInfo.isConnected
                                                                  ? ((0, v.uX)(),
                                                                    (0, v.CE)("span", X, [
                                                                        (0, v.bF)(i, { name: "checkmark-circle", type: "success" }),
                                                                        (0, v.eW)(" Flixmate v" + (0, F.v_)(e.flixmateInfo.version) + " " + (0, F.v_)(e.locale.connectedText), 1),
                                                                    ]))
                                                                  : (0, v.Q3)("v-if", !0)
                                                              : ((0, v.uX)(),
                                                                (0, v.CE)("span", q, [
                                                                    (0, v.bF)(i, { name: "warning", type: "warning" }),
                                                                    (0, v.eW)(" " + (0, F.v_)(e.locale.disconnectedText) + " ", 1),
                                                                    e.app.options.flixmateEnabled ? ((0, v.uX)(), (0, v.CE)("a", K, (0, F.v_)(e.locale.disconnectedLinkText), 1)) : (0, v.Q3)("v-if", !0),
                                                                ]))
                                                          : ((0, v.uX)(),
                                                            (0, v.CE)("span", N, [
                                                                (0, v.bF)(i, { name: "close-circle", type: "danger" }),
                                                                (0, v.eW)(" " + (0, F.v_)(e.locale.unsupportedText) + " ", 1),
                                                                (0, v.Lk)("a", G, (0, F.v_)(e.locale.unsupportedLinkText), 1),
                                                            ])),
                                                  ],
                                                  64
                                              ))
                                            : (0, v.Q3)("v-if", !0),
                                    ]),
                                    (0, v.bF)(
                                        s,
                                        { help: e.locale.enabledSwitchHelpText },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    d,
                                                    {
                                                        modelValue: e.options.enabled,
                                                        "onUpdate:modelValue": t[0] || (t[0] = (t) => (e.options.enabled = t)),
                                                        disabled: !e.flixmateInfo || !e.flixmateInfo.isSupported,
                                                        onChange: t[1] || (t[1] = (t) => e.app.options.set("flixmateEnabled", t)),
                                                    },
                                                    { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.enabledSwitchLabel), 1)]), _: 1 },
                                                    8,
                                                    ["modelValue", "disabled"]
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["help"]
                                    ),
                                    (0, v.bF)(
                                        s,
                                        { label: e.locale.formatsLabel, class: (0, F.C4)({ "is-disabled": !e.flixmateInfo || !e.flixmateInfo.isSupported }) },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    p,
                                                    {
                                                        modelValue: e.options.formats,
                                                        "onUpdate:modelValue": t[2] || (t[2] = (t) => (e.options.formats = t)),
                                                        type: "inline",
                                                        onChange: t[3] || (t[3] = (t) => e.app.options.set("flixmateFormats", t.flat())),
                                                    },
                                                    {
                                                        default: (0, v.k6)(() => [
                                                            (0, v.bF)(u, { value: "mp4", disabled: "" }, { default: (0, v.k6)(() => [(0, v.eW)(" MP4 ")]), _: 1 }),
                                                            (0, v.bF)(u, { value: "mkv", disabled: !e.flixmateInfo || !e.flixmateInfo.isSupported }, { default: (0, v.k6)(() => [(0, v.eW)(" MKV ")]), _: 1 }, 8, ["disabled"]),
                                                            (0, v.bF)(u, { value: "flv", disabled: !e.flixmateInfo || !e.flixmateInfo.isSupported }, { default: (0, v.k6)(() => [(0, v.eW)(" FLV ")]), _: 1 }, 8, ["disabled"]),
                                                            (0, v.bF)(u, { value: "avi", disabled: !e.flixmateInfo || !e.flixmateInfo.isSupported }, { default: (0, v.k6)(() => [(0, v.eW)(" AVI ")]), _: 1 }, 8, ["disabled"]),
                                                            (0, v.bF)(u, { value: "3gp", disabled: !e.flixmateInfo || !e.flixmateInfo.isSupported }, { default: (0, v.k6)(() => [(0, v.eW)(" 3GP ")]), _: 1 }, 8, ["disabled"]),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    ["modelValue"]
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["label", "class"]
                                    ),
                                    (0, v.bF)(
                                        s,
                                        { help: e.locale.multithreadingSwitchHelpText },
                                        {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(
                                                    d,
                                                    {
                                                        modelValue: e.options.useMultithreading,
                                                        "onUpdate:modelValue": t[4] || (t[4] = (t) => (e.options.useMultithreading = t)),
                                                        disabled: !e.flixmateInfo || !e.flixmateInfo.isSupported,
                                                        onChange: t[5] || (t[5] = (t) => e.app.options.set("flixmateUseMultithreading", t)),
                                                    },
                                                    { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.multithreadingSwitchLabel), 1)]), _: 1 },
                                                    8,
                                                    ["modelValue", "disabled"]
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["help"]
                                    ),
                                ])
                            );
                        },
                    ],
                ]),
                J = {
                    heading: __t("optHeading", "Settings"),
                    restoreButtonText: __t("optRestoreButtonText", "Restore default settings"),
                    restoreConfirmTitle: __t("optRestoreConfirmTitle", "Are you sure?"),
                    restoreConfirmMessage: __t("optRestoreConfirmMessage", "This will reset your settings to default."),
                    restoreSuccessMessage: __t("optRestoreSuccessMessage", "Settings restored successfully."),
                    confirmButtonText: __t("optConfirmButtonText", "Confirm"),
                    cancelButtonText: __t("optCancelButtonText", "Cancel"),
                    helpButtonText: __t("injHelpButtonText", "Help & FAQs"),
                    changeLanguageText: __t("optChangeLanguageText", "Change Language"),
                },
                j = (0, v.pM)({
                    components: { GeneralSettings: U, DownloadSettings: R, FlixmateSettings: z },
                    setup() {
                        const e = (0, v.nI)()?.proxy;
                        return {
                            locale: J,
                            reset: function () {
                                e?.$confirm("warning", J.restoreConfirmTitle, J.restoreConfirmMessage, "warning", J.confirmButtonText, J.cancelButtonText)
                                    .then(() => {
                                        x.A.options.reset(), e?.$notify("success", J.restoreSuccessMessage);
                                    })
                                    .catch(() => {});
                            },
                            openHelpPage: function () {
                                x.A.message.send("background.create-tab", { url: "https://addoncrop.com/help-category/youtube-video-downloader/" });
                            },
                            changeLanguage: function () {
                                x.A.message.send("background.create-tab", { url: "chrome://settings/languages" });
                            },
                        };
                    },
                }),
                Z = (0, M.A)(j, [
                    [
                        "render",
                        function (e, t, o, l, n, i) {
                            const d = (0, v.g2)("s-button"),
                                s = (0, v.g2)("general-settings"),
                                u = (0, v.g2)("download-settings"),
                                p = (0, v.g2)("flixmate-settings"),
                                r = (0, v.g2)("column"),
                                m = (0, v.g2)("row"),
                                b = (0, v.g2)("container");
                            return (
                                (0, v.uX)(),
                                (0, v.Wv)(b, null, {
                                    default: (0, v.k6)(() => [
                                        (0, v.bF)(m, null, {
                                            default: (0, v.k6)(() => [
                                                (0, v.bF)(r, null, {
                                                    default: (0, v.k6)(() => [
                                                        (0, v.Lk)("header", k, [
                                                            (0, v.Lk)("h1", null, (0, F.v_)(e.locale.heading), 1),
                                                            (0, v.bF)(d, { type: "danger", round: "", outlined: "", onClick: e.reset }, { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.restoreButtonText), 1)]), _: 1 }, 8, [
                                                                "onClick",
                                                            ]),
                                                            (0, v.bF)(
                                                                d,
                                                                { type: "success", round: "", outlined: "", style: { "margin-left": "1rem" }, onClick: (0, a.D$)(e.changeLanguage, ["prevent"]) },
                                                                { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.changeLanguageText), 1)]), _: 1 },
                                                                8,
                                                                ["onClick"]
                                                            ),
                                                            (0, v.bF)(
                                                                d,
                                                                { type: "primary", round: "", outlined: "", style: { "margin-left": "1rem" }, onClick: (0, a.D$)(e.openHelpPage, ["prevent"]) },
                                                                { default: (0, v.k6)(() => [(0, v.eW)((0, F.v_)(e.locale.helpButtonText), 1)]), _: 1 },
                                                                8,
                                                                ["onClick"]
                                                            ),
                                                        ]),
                                                        y,
                                                        (0, v.bF)(s),
                                                        D,
                                                        (0, v.bF)(u),
                                                        E,
                                                        (0, v.bF)(p),
                                                        (0, v.Q3)(" <hr>\n                <extras-settings /> "),
                                                    ]),
                                                    _: 1,
                                                }),
                                            ]),
                                            _: 1,
                                        }),
                                    ]),
                                    _: 1,
                                })
                            );
                        },
                    ],
                ]);
            (async () => {
                (0, l.localizeByAttribute)(),
                    await x.A.options.Ready,
                    "system" !== x.A.options.theme && (document.documentElement.dataset.shardTheme = x.A.options.theme),
                    x.A.options.onChange("theme", (e) => {
                        "system" === e ? delete document.documentElement.dataset.shardTheme : (document.documentElement.dataset.shardTheme = e);
                    }),
                    (0, a.Ef)(Z)
                        .use(l.localePlugin)
                        .use(_.A)
                        .use(w.A)
                        .component("container", n.A)
                        .component("row", i.A)
                        .component("column", d.A)
                        .component("icon", s.A)
                        .component("form-item", u.A)
                        .component("select-menu", p.A)
                        .component("select-option", r.A)
                        .component("checkbox-group", m.A)
                        .component("checkbox", b.A)
                        .component("radio-group", c.A)
                        .component("radio", h.A)
                        .component("switch-button", f.A)
                        .component("s-button", g.A)
                        .mount("#root");
            })();
        },
        7525: (e, t, o) => {
            o.d(t, { A: () => a });
            const a = {
                theme: "system",
                extensionDisplayMode: "full",
                showDownloadNotifications: !0,
                embeddedDownloadsEnabled: !0,
                downloadButtonOnUrlsEnabled: !0,
                formats: ["mp4", "m4a", "webm"],
                dashFormats: "none",
                mp3DefaultBitrate: 128,
                copyToClipboardButtonEnabled: !0,
                qrGeneratorButtonEnabled: !0,
                saveAsDialogEnabled: !1,
                flixmateEnabled: !0,
                flixmateFormats: ["mp4", "mkv", "avi"],
                flixmateUseMultithreading: !0,
                preferredVideoPlaybackQuality: "disabled",
                menuOrder: ["dark-mode", "cinema-mode", "pic-in-pic", "float-video", "looper"],
                hiddenMenuOrder: ["smart-pause", "autoplay", "mousewheel-volume-control", "video-search", "hide-comments", "options"],
                floatVideoEnabled: !1,
                smartPauseEnabled: !1,
                audioModeEnabled: !1,
                mousewheelVolumeControlEnabled: !1,
                videoSearchEnabled: !1,
                hideCommentsEnabled: !1,
            };
        },
        1032: (e, t, o) => {
            o.d(t, { A: () => a });
            const a = { mp3FlixmateAlertMinimized: !1, flixmatePromoMinimized: !1 };
        },
        5157: (e, t, o) => {
            o.d(t, { A: () => i });
            var a = o(7447),
                l = o(7525),
                n = o(1032);
            const i = { browserInfo: a.R5, message: new a.bm(), options: (0, a.JY)("__options__", "sync", l.A), userStorage: (0, a.JY)("__user_storage__", "sync", n.A) };
        },
    },
    (e) => {
        e.O(0, [597, 525], () => {
            return (t = 1205), e((e.s = t));
            var t;
        });
        e.O();
    },
]);

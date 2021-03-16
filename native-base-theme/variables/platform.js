import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
    platform === "ios" && (deviceHeight === 812 || deviceWidth === 812);

export default {
    platformStyle,
    platform,

    //Accordion
    headerStyle: "#edebed",
    iconStyle: "#000",
    contentStyle: "#f5f4f5",
    expandedIconStyle: "#000",
    accordionBorderColor: "#d3d3d3",

    // Android
    androidRipple: true,
    androidRippleColor: "rgba(256, 256, 256, 0.3)",
    androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
    btnUppercaseAndroidText: false,

    // Badge
    badgeBg: "#ED1727",
    badgeColor: "#fff",
    badgePadding: platform === "ios" ? 3 : 0,

    // Button
    btnFontFamily: platform === "ios" ? "Roboto" : "Roboto",
    btnDisabledBg: "#b5b5b5",
    buttonPadding: 6,
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return platform === "ios" ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: "#fff",
    cardBorderColor: "#fff",
    cardBorderRadius: 5,
    cardItemPadding: platform === "ios" ? 10 : 10,

    // CheckBox
    CheckboxRadius: platform === "ios" ? 13 : 0,
    CheckboxBorderWidth: platform === "ios" ? 1 : 2,
    CheckboxPaddingLeft: platform === "ios" ? 4 : 2,
    CheckboxPaddingBottom: platform === "ios" ? 0 : 5,
    CheckboxIconSize: platform === "ios" ? 21 : 16,
    CheckboxIconMarginTop: platform === "ios" ? undefined : 1,
    CheckboxFontSize: platform === "ios" ? 23 / 0.9 : 17,
    checkboxBgColor: "#274180",
    checkboxSize: 20,
    checkboxTickColor: "#fff",

    // Color
    brandPrimary: platform === "ios" ? "#274180" : "#274180",
    brandInfo: "#62B1F6",
    brandSuccess: "#5cb85c",
    brandDanger: "#d9534f",
    brandWarning: "#f0ad4e",
    brandDark: "#000",
    brandLight: "#ffffff",

    //Container
    containerBgColor: "#f7f8fc",

    //Date Picker
    datePickerTextColor: "#000",
    datePickerBg: "transparent",

    // Font
    DefaultFontSize: 15,
    fontFamily: platform === "ios" ? "Roboto" : "Roboto",
    fontSizeBase: 14,
    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },

    // Footer
    footerHeight: 55,
    footerDefaultBg: platform === "ios" ? "#FFF" : "#FFF",
    footerPaddingBottom: 0,

    // FooterTab
    tabBarTextColor: platform === "ios" ? "#939999" : "#939999",
    tabBarTextSize: platform === "ios" ? 12 : 11,
    activeTab: platform === "ios" ? "#FFF" : "#fff",
    sTabBarActiveTextColor: "#274180",
    tabBarActiveTextColor: platform === "ios" ? "#274180" : "#274180",
    tabActiveBgColor: platform === "ios" ? "#FFF" : "#FFF",

    // Header
    toolbarBtnColor: platform === "ios" ? "#FFF" : "#FFF",
    toolbarDefaultBg: platform === "ios" ? "#274180" : "#274180",
    toolbarHeight: platform === "ios" ? 64 : 56,
    toolbarSearchIconSize: platform === "ios" ? 20 : 23,
    toolbarInputColor: platform === "ios" ? "#CECDD2" : "#CECDD2",
    searchBarHeight: platform === "ios" ? 30 : 40,
    searchBarInputHeight: platform === "ios" ? 30 : 50,
    toolbarBtnTextColor: platform === "ios" ? "#274180" : "#274180",
    toolbarDefaultBorder: platform === "ios" ? "#274180" : "#274180",
    iosStatusbar: platform === "ios" ? "light-content" : "light-content",
    get statusBarColor() {
        return color(this.toolbarDefaultBg)
            .darken(0.2)
            .hex();
    },
    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    // Icon
    iconFamily: "Feather",
    iconFontSize: platform === "ios" ? 30 : 28,
    iconHeaderSize: platform === "ios" ? 33 : 24,

    // InputGroup
    inputFontSize: 16,
    inputBorderColor: "#D9D5DC",
    inputSuccessBorderColor: "#2b8339",
    inputErrorBorderColor: "#ed2f2f",
    inputHeightBase: 50,
    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return "#575757";
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    lineHeight: platform === "ios" ? 20 : 20,
    listItemSelected: platform === "ios" ? "#274180" : "#274180",

    // List
    listBg: "transparent",
    listBorderColor: "#c9c9c9",
    listDividerBg: "#f4f4f4",
    listBtnUnderlayColor: "#DDD",
    listItemPadding: platform === "ios" ? 10 : 12,
    listNoteColor: "#808080",
    listNoteSize: 12,

    // Progress Bar
    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B",

    // Radio Button
    radioBtnSize: platform === "ios" ? 25 : 23,
    radioSelectedColorAndroid: "#274180",
    radioBtnLineHeight: platform === "ios" ? 29 : 24,
    get radioColor() {
        return this.brandPrimary;
    },

    // Segment
    segmentBackgroundColor: platform === "ios" ? "#FFF" : "#FFF",
    segmentActiveBackgroundColor: platform === "ios" ? "#274180" : "#274180",
    segmentTextColor: platform === "ios" ? "#274180" : "#274180",
    segmentActiveTextColor: platform === "ios" ? "#fff" : "#fff",
    segmentBorderColor: platform === "ios" ? "#274180" : "#274180",
    segmentBorderColorMain: platform === "ios" ? "#a7a6ab" : "#a7a6ab",

    // Spinner
    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    // Tab
    tabDefaultBg: platform === "ios" ? "#FFFFFF" : "#FFF",
    topTabBarTextColor: platform === "ios" ? "#6b6b6b" : "#6b6b6b",
    topTabBarActiveTextColor: platform === "ios" ? "#274180" : "#274180",
    topTabBarBorderColor: platform === "ios" ? "#a7a6ab" : "#a7a6ab",
    topTabBarActiveBorderColor: platform === "ios" ? "#274180" : "#274180",

    // Tabs
    tabBgColor: "#FFFFFF",
    tabFontSize: 15,

    // Text
    textColor: "#000",
    inverseTextColor: "#fff",
    noteFontSize: 12,
    get defaultTextColor() {
        return this.textColor;
    },

    // Title
    titleFontfamily: platform === "ios" ? "Roboto_medium" : "Roboto_medium",
    titleFontSize: platform === "ios" ? 17 : 17,
    subTitleFontSize: platform === "ios" ? 11 : 12,
    subtitleColor: platform === "ios" ? "#8e8e93" : "#FFF",
    titleFontColor: platform === "ios" ? "#000" : "#FFF",

    // Other
    borderRadiusBase: platform === "ios" ? 5 : 2,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 10,
    dropdownLinkColor: "#414142",
    inputLineHeight: 24,
    deviceWidth,
    deviceHeight,
    isIphoneX,
    inputGroupRoundedBorderRadius: 30,

    //iPhoneX SafeArea
    Inset: {
        portrait: {
            topInset: 24,
            leftInset: 0,
            rightInset: 0,
            bottomInset: 34
        },
        landscape: {
            topInset: 0,
            leftInset: 44,
            rightInset: 44,
            bottomInset: 21
        }
    }
};

import { ComputedRef } from 'vue';
import Ajv from 'ajv';
export declare const useControlAppliedOptions: <I extends {
    control: any;
}>(input: I) => ComputedRef<any>;
export declare const useComputedLabel: <I extends {
    control: any;
}>(input: I, appliedOptions: ComputedRef<any>) => ComputedRef<string>;
/**
 * Adds styles, appliedOptions and vuetifyProps
 */
export declare const useVuetifyLabel: <I extends {
    label: any;
}>(input: I) => I & {
    appliedOptions: ComputedRef<any>;
    vuetifyProps: (path: string) => any;
    styles: import("../styles").Styles;
};
/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export declare const useVuetifyControl: <I extends {
    control: any;
    handleChange: any;
}>(input: I, adaptValue?: (target: any) => any, debounceWait?: number) => I & {
    control: ComputedRef<any>;
    styles: import("../styles").Styles;
    isFocused: import("vue").Ref<boolean>;
    appliedOptions: ComputedRef<any>;
    controlWrapper: ComputedRef<{
        id: any;
        description: any;
        errors: any;
        label: any;
        visible: any;
        required: any;
    }>;
    onChange: (value: any) => void;
    vuetifyProps: (path: string) => any;
    persistentHint: () => boolean;
    computedLabel: ComputedRef<string>;
    touched: import("vue").Ref<boolean>;
    handleBlur: () => void;
    handleFocus: () => void;
    rawErrors: ComputedRef<any>;
};
export declare const useTranslator: () => ComputedRef<import("@jsonforms/core").Translator>;
/**
 * Adds styles and appliedOptions
 */
export declare const useVuetifyLayout: <I extends {
    layout: any;
}>(input: I) => I & {
    styles: import("../styles").Styles;
    appliedOptions: ComputedRef<any>;
    vuetifyProps: (path: string) => any;
};
/**
 * Adds styles, appliedOptions and childUiSchema
 */
export declare const useVuetifyArrayControl: <I extends {
    control: any;
}>(input: I) => I & {
    control: ComputedRef<any>;
    styles: import("../styles").Styles;
    appliedOptions: ComputedRef<any>;
    childLabelForIndex: (index: number | null) => string;
    computedLabel: ComputedRef<string>;
    vuetifyProps: (path: string) => any;
    rawChildErrors: any;
};
/**
 * Adds styles and appliedOptions
 */
export declare const useVuetifyBasicControl: <I extends {
    control: any;
}>(input: I) => I & {
    styles: import("../styles").Styles;
    appliedOptions: ComputedRef<any>;
    vuetifyProps: (path: string) => any;
};
/**
 * Extracts Ajv from JSON Forms
 */
export declare const useAjv: () => Ajv;
export interface NestedInfo {
    level: number;
    parentElement?: 'array' | 'object';
}
export declare const useNested: (element: false | 'array' | 'object') => NestedInfo;

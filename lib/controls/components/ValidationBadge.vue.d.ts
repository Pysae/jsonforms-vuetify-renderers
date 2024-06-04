import { PropType } from 'vue';
import { ErrorObject } from 'ajv';
declare const _default: import("vue").DefineComponent<{
    errors: {
        required: true;
        type: PropType<ErrorObject<string, Record<string, any>, unknown>[]>;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    offsetX: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    offsetY: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    overlap: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {
    tooltipMessages(): string[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    errors: {
        required: true;
        type: PropType<ErrorObject<string, Record<string, any>, unknown>[]>;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    offsetX: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    offsetY: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    overlap: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    bordered: boolean;
    color: string;
    inline: boolean;
    offsetX: string | number;
    offsetY: string | number;
    overlap: boolean;
}, {}>;
export default _default;

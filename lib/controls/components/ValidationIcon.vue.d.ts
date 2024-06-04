import { PropType } from 'vue';
import { ErrorObject } from 'ajv';
declare const _default: import("vue").DefineComponent<{
    errors: {
        required: true;
        type: PropType<ErrorObject<string, Record<string, any>, unknown>[]>;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    errors: {
        required: true;
        type: PropType<ErrorObject<string, Record<string, any>, unknown>[]>;
    };
}>>, {}, {}>;
export default _default;

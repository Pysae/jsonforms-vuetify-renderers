import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    schema: {
        type: PropType<JsonSchema>;
        required: true;
    };
    combinatorKeyword: {
        type: PropType<"oneOf" | "anyOf" | "allOf">;
        required: true;
    };
    path: {
        type: StringConstructor;
        required: true;
    };
}, {
    otherProps: JsonSchema;
    foundUISchema: UISchemaElement;
    isLayoutWithElements: boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    schema: {
        type: PropType<JsonSchema>;
        required: true;
    };
    combinatorKeyword: {
        type: PropType<"oneOf" | "anyOf" | "allOf">;
        required: true;
    };
    path: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, {}>;
export default _default;

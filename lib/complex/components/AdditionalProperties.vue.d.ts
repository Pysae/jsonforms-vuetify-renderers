import { JsonSchema, JsonSchema7, UISchemaElement } from '@jsonforms/core';
import Ajv, { ValidateFunction } from 'ajv';
import { PropType } from 'vue';
interface AdditionalPropertyType {
    propertyName: string;
    path: string;
    schema: JsonSchema | undefined;
    uischema: UISchemaElement | undefined;
}
declare const _default: import("vue").DefineComponent<{
    input: {
        type: PropType<{
            control: import("vue").ComputedRef<{
                uischemas: import("@jsonforms/core").JsonFormsUISchemaRegistryEntry[];
                renderers: import("@jsonforms/core").JsonFormsRendererRegistryEntry[];
                cells: import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[];
                label: string;
                description: string;
                required: boolean;
                i18nKeyPrefix: string;
                uischema: import("@jsonforms/core").ControlElement;
                errors: string;
                data: any;
                rootSchema: JsonSchema;
                id: string;
                config: any;
                schema: JsonSchema;
                enabled: boolean;
                visible: boolean;
                path: string;
            }>;
        } & import("@jsonforms/core").DispatchPropsOfControl>;
        required: true;
    };
}, {
    t: import("vue").ComputedRef<import("@jsonforms/core").Translator>;
    vuetifyProps: (path: string) => any;
    ajv: Ajv;
    propertyNameValidator: ValidateFunction<unknown> | undefined;
    control: import("vue").ComputedRef<{
        uischemas: import("@jsonforms/core").JsonFormsUISchemaRegistryEntry[];
        renderers: import("@jsonforms/core").JsonFormsRendererRegistryEntry[];
        cells: import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[];
        label: string;
        description: string;
        required: boolean;
        i18nKeyPrefix: string;
        uischema: import("@jsonforms/core").ControlElement;
        errors: string;
        data: any;
        rootSchema: JsonSchema;
        id: string;
        config: any;
        schema: JsonSchema;
        enabled: boolean;
        visible: boolean;
        path: string;
    }>;
    styles: import("../../styles").Styles;
    appliedOptions: import("vue").ComputedRef<any>;
    additionalPropertyItems: import("vue").Ref<{
        propertyName: string;
        path: string;
        schema: {
            $ref?: string | undefined;
            id?: string | undefined;
            $schema?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            default?: any;
            multipleOf?: number | undefined;
            maximum?: number | undefined;
            exclusiveMaximum?: boolean | undefined;
            minimum?: number | undefined;
            exclusiveMinimum?: boolean | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            additionalItems?: boolean | any | undefined;
            items?: any | any[] | undefined;
            maxItems?: number | undefined;
            minItems?: number | undefined;
            uniqueItems?: boolean | undefined;
            maxProperties?: number | undefined;
            minProperties?: number | undefined;
            required?: string[] | undefined;
            additionalProperties?: boolean | any | undefined;
            definitions?: {
                [key: string]: import("@jsonforms/core").JsonSchema4;
            } | undefined;
            properties?: {
                [property: string]: import("@jsonforms/core").JsonSchema4;
            } | undefined;
            patternProperties?: {
                [pattern: string]: import("@jsonforms/core").JsonSchema4;
            } | undefined;
            dependencies?: {
                [key: string]: import("@jsonforms/core").JsonSchema4 | string[];
            } | undefined;
            enum?: any[] | undefined;
            type?: string | string[] | undefined;
            allOf?: any[] | undefined;
            anyOf?: any[] | undefined;
            oneOf?: any[] | undefined;
            not?: any | undefined;
            format?: string | undefined;
            const?: any;
        } | {
            $ref?: string | undefined;
            $id?: string | undefined;
            $schema?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            default?: any;
            multipleOf?: number | undefined;
            maximum?: number | undefined;
            exclusiveMaximum?: number | undefined;
            minimum?: number | undefined;
            exclusiveMinimum?: number | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            additionalItems?: boolean | any | undefined;
            items?: any | any[] | undefined;
            maxItems?: number | undefined;
            minItems?: number | undefined;
            uniqueItems?: boolean | undefined;
            maxProperties?: number | undefined;
            minProperties?: number | undefined;
            required?: string[] | undefined;
            additionalProperties?: boolean | any | undefined;
            definitions?: {
                [key: string]: JsonSchema7;
            } | undefined;
            properties?: {
                [property: string]: JsonSchema7;
            } | undefined;
            patternProperties?: {
                [pattern: string]: JsonSchema7;
            } | undefined;
            dependencies?: {
                [key: string]: JsonSchema7 | string[];
            } | undefined;
            enum?: any[] | undefined;
            type?: string | string[] | undefined;
            allOf?: any[] | undefined;
            anyOf?: any[] | undefined;
            oneOf?: any[] | undefined;
            not?: any | undefined;
            format?: string | undefined;
            readOnly?: boolean | undefined;
            writeOnly?: boolean | undefined;
            examples?: any[] | undefined;
            contains?: any | undefined;
            propertyNames?: any | undefined;
            const?: any;
            if?: any | undefined;
            then?: any | undefined;
            else?: any | undefined;
            errorMessage?: any;
        } | undefined;
        uischema: {
            type: string;
            rule?: {
                effect: import("@jsonforms/core").RuleEffect;
                condition: {
                    readonly type?: string | undefined;
                };
            } | undefined;
            options?: {
                [key: string]: any;
            } | undefined;
        } | undefined;
    }[]>;
    toAdditionalPropertyType: (propName: string, propValue: any) => AdditionalPropertyType;
    newPropertyName: import("vue").Ref<string | null>;
}, unknown, {
    addPropertyDisabled(): boolean;
    maxPropertiesReached(): boolean;
    removePropertyDisabled(): boolean;
    minPropertiesReached(): boolean;
    newPropertyErrors(): string[];
    placeholder(): string;
    reservedPropertyNames(): string[];
    additionalPropertiesTitle(): string | undefined;
    addToLabel(): string;
    deleteLabel(): string;
}, {
    composePaths: (path1: string, path2: string) => string;
    i18nKey(key: string): string;
    addProperty(): void;
    removeProperty(propName: string): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    input: {
        type: PropType<{
            control: import("vue").ComputedRef<{
                uischemas: import("@jsonforms/core").JsonFormsUISchemaRegistryEntry[];
                renderers: import("@jsonforms/core").JsonFormsRendererRegistryEntry[];
                cells: import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[];
                label: string;
                description: string;
                required: boolean;
                i18nKeyPrefix: string;
                uischema: import("@jsonforms/core").ControlElement;
                errors: string;
                data: any;
                rootSchema: JsonSchema;
                id: string;
                config: any;
                schema: JsonSchema;
                enabled: boolean;
                visible: boolean;
                path: string;
            }>;
        } & import("@jsonforms/core").DispatchPropsOfControl>;
        required: true;
    };
}>>, {}, {}>;
export default _default;

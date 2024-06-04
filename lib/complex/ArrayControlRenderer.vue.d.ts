import { JsonFormsRendererRegistryEntry, ControlElement, JsonSchema } from '@jsonforms/core';
declare const controlRenderer: import("vue").DefineComponent<{
    schema: {
        required: true;
        type: import("vue").PropType<JsonSchema>;
    };
    uischema: {
        required: true;
        type: import("vue").PropType<ControlElement>;
    };
    path: {
        required: true;
        type: StringConstructor;
    };
    enabled: {
        required: false;
        type: BooleanConstructor;
        default: undefined;
    };
    renderers: {
        required: boolean;
        type: import("vue").PropType<JsonFormsRendererRegistryEntry[]>;
        default: undefined;
    };
    cells: {
        required: boolean;
        type: import("vue").PropType<import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[]>;
        default: undefined;
    };
    config: {
        required: boolean;
        type: ObjectConstructor;
        default: undefined;
    };
}, {
    control: import("vue").ComputedRef<{
        translations: import("@jsonforms/core").ArrayTranslations;
        childErrors: import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
        uischemas: import("@jsonforms/core").JsonFormsUISchemaRegistryEntry[];
        renderers: JsonFormsRendererRegistryEntry[];
        cells: import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[];
        label: string;
        description: string;
        required: boolean;
        i18nKeyPrefix: string;
        uischema: ControlElement;
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
} & import("@jsonforms/core").DispatchPropsOfArrayControl & {
    control: import("vue").ComputedRef<any>;
    styles: import("..").Styles;
    appliedOptions: import("vue").ComputedRef<any>;
    childLabelForIndex: (index: number | null) => string;
    computedLabel: import("vue").ComputedRef<string>;
    vuetifyProps: (path: string) => any;
    rawChildErrors: any;
}, unknown, {
    arraySchema(): JsonSchema | undefined;
    dataLength(): number;
}, {
    composePaths: (path1: string, path2: string) => string;
    createDefaultValue: (schema: JsonSchema, rootSchema: JsonSchema) => any;
    addButtonClick(): void;
    moveUpClick(event: Event, toMove: number): void;
    moveDownClick(event: Event, toMove: number): void;
    removeItemsClick(event: Event, toDelete: number[]): void;
    getValidColumnProps(scopedSchema: JsonSchema): string[];
    title(prop: string): any;
    resolveUiSchema(propName: string): ControlElement;
    controlWithoutLabel(scope: string): ControlElement;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    schema: {
        required: true;
        type: import("vue").PropType<JsonSchema>;
    };
    uischema: {
        required: true;
        type: import("vue").PropType<ControlElement>;
    };
    path: {
        required: true;
        type: StringConstructor;
    };
    enabled: {
        required: false;
        type: BooleanConstructor;
        default: undefined;
    };
    renderers: {
        required: boolean;
        type: import("vue").PropType<JsonFormsRendererRegistryEntry[]>;
        default: undefined;
    };
    cells: {
        required: boolean;
        type: import("vue").PropType<import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[]>;
        default: undefined;
    };
    config: {
        required: boolean;
        type: ObjectConstructor;
        default: undefined;
    };
}>>, {
    enabled: boolean;
    renderers: JsonFormsRendererRegistryEntry[];
    cells: import("@jsonforms/core").JsonFormsCellRendererRegistryEntry[];
    config: Record<string, any>;
}, {}>;
export default controlRenderer;
export declare const entry: JsonFormsRendererRegistryEntry;

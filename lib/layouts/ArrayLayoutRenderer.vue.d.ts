import { JsonFormsRendererRegistryEntry, ControlElement, UISchemaElement, JsonSchema } from '@jsonforms/core';
import { i18nDefaultMessages } from '../util';
import { ErrorObject } from 'ajv';
declare type I18nArrayLayoutKey = keyof typeof i18nDefaultMessages.arraylayout;
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
    currentlyExpanded: import("vue").Ref<number | null>;
    cardProps: import("vue").ComputedRef<any>;
    expansionPanelsProps: import("vue").ComputedRef<any>;
    suggestToDelete: import("vue").Ref<number | null>;
    t: import("vue").ComputedRef<import("@jsonforms/core").Translator>;
    control: import("vue").ComputedRef<{
        translations: import("@jsonforms/core").ArrayTranslations;
        childErrors: ErrorObject<string, Record<string, any>, unknown>[];
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
    }> & import("vue").ComputedRef<any>;
    addItem(path: string, value: any): () => void;
    removeItems?(path: string, toDelete: number[]): () => void;
    moveUp?(path: string, toMove: number): () => void;
    moveDown?(path: string, toMove: number): () => void;
    styles: import("..").Styles;
    appliedOptions: import("vue").ComputedRef<any>;
    childLabelForIndex: (index: number | null) => string;
    computedLabel: import("vue").ComputedRef<string>;
    vuetifyProps: (path: string) => any;
    rawChildErrors: any;
}, unknown, {
    addDisabled(): boolean;
    dataLength(): number;
    foundUISchema(): UISchemaElement;
    arraySchema(): JsonSchema | undefined;
    hideAvatar(): boolean;
    translatedLabels(): {
        add: string;
        delete: string;
        moveUp: string;
        moveDown: string;
        dialogTitle: string;
        dialogText: string;
        dialogConfirm: string;
        dialogCancel: string;
    };
}, {
    composePaths: (path1: string, path2: string) => string;
    createDefaultValue: (schema: JsonSchema, rootSchema: JsonSchema) => any;
    addButtonClick(): void;
    moveUpClick(event: Event, toMove: number): void;
    moveDownClick(event: Event, toMove: number): void;
    removeItemsClick(toDelete: number[] | null): void;
    childErrors(index: number): ErrorObject[];
    translateLabel(labelType: I18nArrayLayoutKey, additionalContext?: Record<string, unknown> | undefined, transformMessage?: (message: string) => string): string;
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

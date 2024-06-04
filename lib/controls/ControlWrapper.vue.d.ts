import { PropType } from 'vue';
import { Styles } from '../styles';
declare const _default: import("vue").DefineComponent<{
    id: {
        required: true;
        type: StringConstructor;
    };
    visible: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    styles: {
        required: true;
        type: PropType<Styles>;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        required: true;
        type: StringConstructor;
    };
    visible: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    styles: {
        required: true;
        type: PropType<Styles>;
    };
}>>, {
    visible: boolean;
}, {}>;
export default _default;

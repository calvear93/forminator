import { Dictionary } from '.';
import { Field } from '../classes/field';
import { CounterRefHandler } from './counter.hook';
import { TraceRefHandler } from './tracer.hook.d';

/**
 * Form on change interceptor function.
 *
 * @export
 * @interface FormOnChangeInterceptor
 */
export interface FormOnChangeInterceptor {
     (field: Field, fields: Dictionary<Field>): boolean;
}

/**
 * Forms state counters.
 *
 * @export
 * @interface FormStateHandlerCounters
 */
export interface FormStateHandlerCounters {

     /**
      * Touched fields counter.
      *
      * @type {CounterRefHandler}
      */
     touched: CounterRefHandler;

     /**
      * Changed fields counter.
      *
      * @type {CounterRefHandler}
      */
     changed: CounterRefHandler;

     /**
      * No valid fields counter.
      *
      * @type {CounterRefHandler}
      */
     errors: CounterRefHandler;
}

/**
 * Form state.
 *
 * @export
 * @interface FormStateHandler
 */
export interface FormStateHandler {

     /**
      * Triggers hook re-rendering.
      */
     render: ()=> void;

     /**
      * Traces async operation.
      *
      * @type {TraceRefHandler}
      */
     tracer: TraceRefHandler;

     /**
      * Form on change interceptor function.
      *
      * @date 22/05/2021
      * @type {FormOnChangeInterceptor}
      */
     interceptor: FormOnChangeInterceptor;

     /**
      * Whether avoid form re-rendering.
      *
      * @type {React.MutableRefObject<boolean>}
      */
     preventRender: React.MutableRefObject<boolean>;

     /**
      * Form state counters.
      *
      * @type {FormStateHandlerCounters}
      */
     counters: FormStateHandlerCounters;
}

/**
 * Field mutators.
 *
 * @export
 * @interface FieldMutator
 */
export interface FieldMutator {

     /**
      * Validate mutator.
      *
      * @type {FieldMutatorValidate}
      */
     validate: FieldMutatorValidate;

     /**
      * Mask mutator.
      *
      * @type {FieldMutatorMask}
      */
     mask: FieldMutatorMask;

     /**
      * Equality comparer.
      *
      * @type {FieldMutatorMask}
      */
     equal?: (a: any, b: any)=> boolean;
}

/**
 * Validate mutator.
 *
 * @export
 * @interface FieldMutatorValidate
 */
export interface FieldMutatorValidate {

     /**
      * Whether validation is enabled.
      *
      * @type {boolean}
      */
     enabled?: boolean;

     /**
      * Field validation function.
      */
     apply?: (field: Field, fields: Dictionary<Field>)=> any | Promise<any>;

     /**
      * YUP validation schema.
      *
      * @type {AnySchema}
      */
     schema?: AnySchema;

     /**
      * Whether validation must be executed on init.
      *
      * @type {boolean}
      */
     onInit?: boolean;

     /**
      * Whether validation must be executed on each field value change.
      *
      * @type {boolean}
      */
     onChange?: boolean;

     /**
      * Debouncing validation in milliseconds.
      * 0 for disabled.
      *
      * @type {number}
      */
     debounce?: number;

     /**
      * Whether debouncing should be
      * change field state to loading.
      *
      * @type {boolean}
      */
     debounceLoading?: boolean;
}

/**
 * Mask mutator.
 *
 * @export
 * @interface FieldMutatorMask
 */
export interface FieldMutatorMask {

     /**
      * Whether masking is enabled.
      *
      * @type {boolean}
      */
     enabled?: boolean;

     /**
      * Field mask function.
      */
     apply?: (field: Field, fields: Dictionary<Field>)=> any;
}

/**
 * Form fields and state.
 *
 * @export
 * @interface FormReturn
 */
export interface FormReturn {

     /**
      * Form fields.
      *
      * @type {Dictionary<Field>}
      */
     fields: Dictionary<Field>;

     /**
      * Form state.
      *
      * @type {FormStateReturn}
      */
     state: FormStateReturn;
}

/**
 *Forms state for return.
 *
 * @export
 * @interface FormStateReturn
 */
export interface FormStateReturn {

     /**
      * Whether form is valid.
      *
      * @type {boolean}
      */
     valid: boolean;

     /**
      * Whether form is touched.
      *
      * @type {boolean}
      */
     touched: boolean;

      /**
       * Whether form is changed.
       *
       * @type {boolean}
       */
     changed: boolean;
}

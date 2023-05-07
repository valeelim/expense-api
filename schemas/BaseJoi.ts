import Joi, { Extension } from 'joi';
import sanitize from 'sanitize-html';

const santizeHtmlExtension: Extension = {
    type: 'string',
    base: Joi.string(),
    messages: {
        'string.escapeHTML': '{{$label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value: string, helpers): string {
                const clean: string = sanitize(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (value !== clean)
                    return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
}

const BaseJoi = Joi.extend(santizeHtmlExtension);

export default BaseJoi;

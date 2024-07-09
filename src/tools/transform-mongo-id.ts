export const transformMongoId = (schema: any) =>
    schema.set('toJSON', {
        transform: (doc: any, ret: any) => {
            ret.id = ret._id.toHexString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
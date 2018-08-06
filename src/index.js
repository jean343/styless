import taggedTemplateExpressionVisitor from './visitors/taggedTemplateExpressionVisitor'

export default babel => ({
    visitor: {
        TaggedTemplateExpression(path, state) {
            taggedTemplateExpressionVisitor(path, state);
        },
    }
});

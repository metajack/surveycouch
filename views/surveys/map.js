function (doc) {
    if (doc.type && doc.type === 'survey')
        emit(doc._id, doc);
};

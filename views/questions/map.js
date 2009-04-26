function (doc) {
    if (doc.type && doc.type === 'question')
        emit(doc._id, doc);
};

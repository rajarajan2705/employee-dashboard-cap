sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"learningsmaster/test/integration/pages/LearningsMasterList",
	"learningsmaster/test/integration/pages/LearningsMasterObjectPage"
], function (JourneyRunner, LearningsMasterList, LearningsMasterObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('learningsmaster') + '/test/flp.html#app-preview',
        pages: {
			onTheLearningsMasterList: LearningsMasterList,
			onTheLearningsMasterObjectPage: LearningsMasterObjectPage
        },
        async: true
    });

    return runner;
});


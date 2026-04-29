sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"projectsmaster/test/integration/pages/ProjectsMasterList",
	"projectsmaster/test/integration/pages/ProjectsMasterObjectPage"
], function (JourneyRunner, ProjectsMasterList, ProjectsMasterObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('projectsmaster') + '/test/flp.html#app-preview',
        pages: {
			onTheProjectsMasterList: ProjectsMasterList,
			onTheProjectsMasterObjectPage: ProjectsMasterObjectPage
        },
        async: true
    });

    return runner;
});


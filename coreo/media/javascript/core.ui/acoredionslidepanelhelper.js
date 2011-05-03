/**
 * Class: AcoredionSlidePanelHelper
 * 
 * Helper functions for tying a <SlidePanel> to an <Acoredion>. 
 * 
 * Namespace:
 *   core.ui
 * 
 * Dependencies:
 *   - jQuery
 */
if (!window.core)
	window.core = {};
if (!window.core.ui)
	window.core.ui = {};

(function($, ns) {
	var CreateLibraryCallback = function(slidePanelEl, libraryService, linkService, geoDataRetriever) {
		var panelId, form;
		panelId = "create-library";
		
		buildForm = function() {
			return $("<div>", { "class": "create-library-form" })
				.append($("<div>", { "class": "ui-state-error ui-helper-hidden" }))
				.append($("<label>", { "for": "name", text: "Name" }))
				.append($("<input>", { type: "text", name: "name"  }))
				.append($("<label>", { "for": "description", text: "Description" }))
				.append($("<textarea>", { name: "description"  }))
				.append($("<label>", { "for": "tags", text: "Tags" }))
				.append($("<input>", { type: "text", name: "tags"  }))
				.append($("<div>", { "class": "buttons" })
					.append($("<button>", { "class": "ui-priority-secondary", text: "Cancel"}).button()
								.click(function() {
									$(slidePanelEl).slidepanel("removeId", panelId);
								}))
					.append($("<button>", { "class": "ui-priority-primary", text: "OK"}).button()
								.click(function() {
									var nameEl, name, descEl, desc, tagsEl, tags, abort, i, tagTokens, tagToken;
									form.find("div.ui-state-error:has(label)").find(":first-child").unwrap();
									form.addClass("ui-widget-shadow");
									form.parent()
										.append($("<div>", { "class": "ui-widget-overlay" }))
										.append($("<div>", {
												css: { 
													"width": "100%",
													"position": "absolute",
													"top": "30%", 
													"left": "0", 
													"text-align": "center" 
												}})
											.append($("<div>", {
													"class": "ui-state-highlight ui-corner-all",
													css: {
														"padding": "0.5em",
														"display": "inline-block"
													}
												})
												.append($("<span>", { 
															"class": "create-library-loading", 
															"text": "Saving"
														}))));
										abort = false;
										nameEl = form.find("input[name='name']");
										name = $.trim(nameEl.val());
										if (name.length == 0) {
											nameEl.add(form.find("label[for='name']"))
												.wrapAll($("<div>", { "class": "ui-state-error ui-corner-all" }));
											abort = true;
										}
										descriptionEl = form.find("textarea[name='description']");
										description = $.trim(descriptionEl.val());
										if (description.length == 0) {
											descriptionEl.add(form.find("label[for='description']"))
												.wrapAll($("<div>", { "class": "ui-state-error ui-corner-all" }));
											abort = true;
										}
										if (abort) {
											// remove "loading" overlay
											form.siblings().remove();
											form.removeClass("ui-widget-shadow");
											return false;
										}
										tagsEl = form.find("input[name='tags']");
										tags = [];
										tagTokens = tagsEl.val().split(",");
										for (i = 0; i < tagTokens.length; i++) {
											tagToken = $.trim(tagTokens[i]);
											if (tagToken.length > 0)
												tags.push(tagToken);
										}
	
										libraryService.createLibrary(name, description, [], tags)
											.then(function(newLibrary) {
													var linkLibraryGeoData;
													$(slidePanelEl).slidepanel("removeId", panelId);
													linkLibraryGeoData = new core.geo.LinkLibraryGeoData(
															null, newLibrary, linkService, geoDataRetriever);
													deferred.resolve(linkLibraryGeoData);
												},
												function(errorThrown) {
													var idx;
													idx = $(slidePanelEl).slidepanel("getIndex", panelId);
													if (idx >= 0) {
														// remove "loading" overlay
														form.siblings().remove();
														form.removeClass("ui-widget-shadow");
														form.children("div.ui-state-error").empty()
															.append($("<span>", { "class": "ui-icon ui-icon-alert",
																					"css": { "float": "left", "margin-right": "0.3em" }}))
															.append($("<p>", { html: errorThrown }))
															.removeClass("ui-helper-hidden");
														$(slidePanelEl).slidepanel("showPanelByIndex", idx);
													}
												});
									})
								));
		};
		
		return function() {
			var deferred, idx;
			deferred = new $.Deferred();
			idx = $(slidePanelEl).slidepanel("getIndex", panelId);
			if (idx == -1) {
				// form doesn't exist, or panel was removed. create it.
				form = buildForm();
				idx = $(slidePanelEl).slidepanel("append", {
						id: panelId,
						title: "Create Link Library",
						content: form 
				});
			}
			$(slidePanelEl).slidepanel("showPanelByIndex", idx);
			if (!$(slidePanelEl).is(":visible")) {
				$(slidePanelEl).show("slide", {}, 200, null);
			}
			return deferred.promise();
		};
	};

	var DeleteLinkCallback = function(slidePanelEl, linkService) {
		// TODO
		return function(linkGeoData) {
			var deferred;
			deferred = $.Deferred();
			console.log("Deleting link " + linkGeoData);
			return deferred.promise();
		};
	};

	var DeleteLibraryCallback = function(slidePanelEl, libraryService) {
		// TODO
		return function(linkLibraryGeoData) {
			var deferred;
			deferred = $.Deferred();
			console.log("Deleting LinkLibrary " + linkLibraryGeoData);
			return deferred.promise();
		};
	};

	/**
	 * Constructor: AcoredionSlidePanelHelper
	 * 
	 * Initializes the object.
	 * 
	 * Parameters:
	 *   slidePanelEl - Mixed. jQuery selector string or DOM element where 
	 *         a <SlidePanel> exists.
	 */
	var AcoredionSlidePanelHelper = function(slidePanelEl) {
		return {
			/**
			 * Function: getCreateLibraryCallback
			 * 
			 * Creates a function that handles LinkLibrary creation. The 
			 * returned function can be used as the createLibraryCb 
			 * parameter of the <Acoredion> constructor.
			 * 
			 * Parameters:
			 *   libraryService - <LibraryService>.
			 *   
			 * Returns:
			 *   Function.
			 */
			getCreateLibraryCallback: function(libraryService, linkService, 
					geoDataRetriever) {
				return new CreateLibraryCallback(slidePanelEl, 
						libraryService, linkService, geoDataRetriever);
			},

			/**
			 * Function: getDeleteLibraryCallback
			 * 
			 * Creates a function that handles LinkLibrary deletion. The 
			 * returned function can be used as the deleteLibraryCb 
			 * parameter of the <Acoredion> constructor.
			 * 
			 * Parameters:
			 *   libraryService - <LibraryService>.
			 *   
			 * Returns:
			 *   Function.
			 */
			getDeleteLibraryCallback: function(libraryService) {
				return new DeleteLibraryCallback(slidePanelEl, libraryService);
			},

			/**
			 * Function: getEditLinkCallback
			 * 
			 * Creates a function that handles Link deletion. The 
			 * returned function can be used as the deleteLinkCb 
			 * parameter of the <Acoredion> constructor.
			 * 
			 * Parameters:
			 *   linkService - <LinkService>.
			 *   
			 * Returns:
			 *   Function.
			 */
			getDeleteLinkCallback: function(linkService) {
				return new DeleteLinkCallback(slidePanelEl, linkService);
			}
		};
	};
	ns.AcoredionSlidePanelHelper = AcoredionSlidePanelHelper;
})(jQuery, window.core.ui);
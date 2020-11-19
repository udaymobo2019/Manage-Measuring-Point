sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (BaseController, ODataModel, JSONModel, MessageBox, Utilities, History, MessageToast) {
	"use strict";

	return BaseController.extend("com.sap.build.ba293bd41-us_1.manageMeasuringPoint.controller.Page1", {
		handleRouteMatched: function (oEvent) {
			
		
			this.measuringpoint();
			this.busyDialog();
			// this.getView().getModel("ViewModel").setProperty("/busy", true);
			
			},

		measuringpoint: function () {
			
			MessageToast.show("The data is being loaded");
			
			var list = this.getView().byId("List");
			
			// this.getView().getModel("oGlobalModel").setProperty("/deLay", true);
			
			this.arrL = [];
			var that = this;
			var spath = "/MeasuringPtListSet";
			var oModel = this.getView().getModel();
			oModel.read(spath, {
				success: function (oData, oResponse) {
					
					// that.getView().getModel("ViewModel").setProperty("/busy", false);
					// that.getView().getModel("oGlobalModel").setProperty("/deLay", false);

					var count = oData.results.length;
					for (var i = 0; i < count; i++) {
						var description = oData.results[i].MeasuringPointDes;
						var measurpoint = oData.results[i].MeasuringPoint;
						var equipDes = oData.results[i].EquipmentDes;
						var equino = oData.results[i].EquipmentNumber;
						var fundesc = oData.results[i].FunctionalLocationDes;
						var funno = oData.results[i].FunctionalLocation;
						var fla = oData.results[i].Flag;

						var position = oData.results[i].Position;
						var statu = oData.results[i].Status;
						var category = oData.results[i].Category;

						var obj = {
							desc: description,
							point: measurpoint,
							descr: equipDes,
							eqno: equino,
							funcdes: fundesc,
							funlno: funno,
							posi: position,
							sta: statu,
							cate: category,
							flag: fla

						};

						that.arrL.push(obj);
					}
					//debugger;
					var oModelj = new JSONModel();
					oModelj.setData({
						listdata: that.arrL
					});
					list.setModel(oModelj);

				}
			});

		},

		busyDialog: function () {
			this.BusyDialog.open();
			jQuery.sap.delayedCall(2000, this, function () {
				this.BusyDialog.close();
			});
		},

		HomeButton: function () {
			
				var that = this;
				sap.m.MessageBox.show(
					"Do you want to exit?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirmation Message",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function (oAction) {

							if (oAction === "YES") {

								window.location.replace(
									"https://dashboarddesigngrunt-ba293bd41.dispatcher.us1.hana.ondemand.com/index.html?hc_reset#/PM"
								);
								// location.reload();

							}

						}

					});
			
			
			
			
			
			
			
			
			
			
			// window.location.replace(
			// 	"https://dashboarddesigngrunt-ba293bd41.dispatcher.us1.hana.ondemand.com/index.html?hc_reset#/PM "
			// );

		},

		search: function (oEvent) {
			var SamTbl = oEvent.getParameter("newValue");
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("desc", sap.ui.model.FilterOperator.Contains, SamTbl),
					new sap.ui.model.Filter("point", sap.ui.model.FilterOperator.Contains, SamTbl),
					new sap.ui.model.Filter("descr", sap.ui.model.FilterOperator.Contains, SamTbl),
					new sap.ui.model.Filter("posi", sap.ui.model.FilterOperator.Contains, SamTbl),
					new sap.ui.model.Filter("sta", sap.ui.model.FilterOperator.Contains, SamTbl),
					new sap.ui.model.Filter("cate", sap.ui.model.FilterOperator.Contains, SamTbl)

				],
				false);
			filters = (oFilter);
			var listItem = this.getView().byId("List");
			var binding = listItem.getBinding("items");
			binding.filter(filters);
		},

		_onPageNavButtonPress: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("Page3", oBindingContext, fnResolve, "", 1);
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation, iNextLevel) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var routePattern = this.oRouter.getRoute(sRouteName).getPattern().split('/');
			var contextFilter = new RegExp('^:.+:$');
			var pagePattern = routePattern.filter(function (pattern) {
				var contextPattern = pattern.match(contextFilter);
				return contextPattern === null || contextPattern === undefined;
			});
			iNextLevel = iNextLevel !== undefined ? iNextLevel : pagePattern ? pagePattern.length - 1 : 0;
			this.oFclModel = this.oFclModel ? this.oFclModel : this.getOwnerComponent().getModel("FclRouter");

			var sEntityNameSet;
			var oNextUIState = this.getOwnerComponent().getSemanticHelper().getNextUIState(iNextLevel);
			var sBeginContext, sMidContext, sEndContext;
			if (iNextLevel === 0) {
				sBeginContext = sPath;
			}

			if (iNextLevel === 1) {
				sBeginContext = this.oFclModel.getProperty("/beginContext");
				sMidContext = sPath;
			}

			if (iNextLevel === 2) {
				sBeginContext = this.oFclModel.getProperty("/beginContext");
				sMidContext = this.oFclModel.getProperty("/midContext");
				sEndContext = sPath;
			}

			var sNextLayout = oNextUIState.layout;

			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
					if (iNextLevel === 0) {
						sBeginContext = sPath;
					} else if (iNextLevel === 1) {
						sMidContext = sPath;
					} else {
						sEndContext = sPath;
					}
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						beginContext: sBeginContext,
						midContext: sMidContext,
						endContext: sEndContext,
						layout: sNextLayout
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}
						if (iNextLevel === 0) {
							sBeginContext = sPath;
						} else if (iNextLevel === 1) {
							sMidContext = sPath;
						} else {
							sEndContext = sPath;
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName, {
								layout: sNextLayout
							});
						} else {
							this.oRouter.navTo(sRouteName, {
								beginContext: sBeginContext,
								midContext: sMidContext,
								endContext: sEndContext,
								layout: sNextLayout
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName, {
					layout: sNextLayout,
					measuring: this.measurepoint,    ////will take the variable 
					status: this.status
				});
			}

			if (typeof fnPromiseResolve === "function") {

				fnPromiseResolve();
			}

		},
		_onObjectListItemPress: function (oEvent) {

			var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
			this.measurepoint = oEvent.getParameter("listItem").getBindingContext().getProperty("point");
			this.status = oEvent.getParameter("listItem").getBindingContext().getProperty("sta");
			
			
			
		//	debugger;

				var that = this;
					that._listout = that.getView().getModel("oGlobalModel").getProperty("/listpress");
					if (that._listout === 'X') {
					sap.m.MessageBox.show(
					"Data will be lossed do you want to procced further ?", {
					// icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Warning Message",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
					// notify user
					if (oAction == "YES") {
					
					return new Promise(function (fnResolve) {
					that.doNavigate("Page3", oBindingContext, fnResolve, "", 1);
					}.bind(that)).catch(function (err) {
					if (err !== undefined) {
					MessageBox.error(err.message);
					}
					});
					} else {
					
					}
					}
					});
					} else {
					
					// var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
					// that.equ = oEvent.getParameter("listItem").getBindingContext("oGlobalModel").getProperty("MDocument");
					return new Promise(function (fnResolve) {
					that.doNavigate("Page3", oBindingContext, fnResolve, "", 1);
					}.bind(that)).catch(function (err) {
					if (err !== undefined) {
					MessageBox.error(err.message);
					}
					});
					
					}



			// return new Promise(function (fnResolve) {

			// 	this.doNavigate("Page3", oBindingContext, fnResolve, "", 1);
			// }.bind(this)).catch(function (err) {
			// 	if (err !== undefined) {
			// 		MessageBox.error(err.message);
			// 	}
			// });
			
					// this.measurepoint2 = oEvent.getParameter("listItem").getBindingContext("oGlobalModel").getProperty("point");
					// this.status2 = oEvent.getParameter("listItem").getBindingContext("oGlobalModel").getProperty("sta");
			
					//this.equ = oEvent.getParameter("listItem").getBindingContext("oGlobalModel").getProperty("MDocument");
				

		},
		_onExpandButtonPress: function () {
			var endColumn = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().columnsVisibility.endColumn;
			var isFullScreen = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().isFullScreen;
			var nextLayout;
			var actionsButtonsInfo = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().actionButtonsInfo;
			if (endColumn && isFullScreen) {
				nextLayout = actionsButtonsInfo.endColumn.exitFullScreen;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(2).layout;
			}
			if (!endColumn && isFullScreen) {
				nextLayout = actionsButtonsInfo.midColumn.exitFullScreen;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(1).layout;
			}
			if (endColumn && !isFullScreen) {
				nextLayout = actionsButtonsInfo.endColumn.fullScreen;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(3).layout;
			}
			if (!endColumn && !isFullScreen) {
				nextLayout = actionsButtonsInfo.midColumn.fullScreen;
				nextLayout = nextLayout ? nextLayout : 'MidColumnFullScreen'
			}
			var pageName = this.oView.sViewName.split('.');
			pageName = pageName[pageName.length - 1];
			this.oRouter.navTo(pageName, {
				layout: nextLayout
			});

		},
		_onCloseButtonPress: function () {
			var endColumn = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().columnsVisibility.endColumn;
			var nextPage;
			var nextLevel = 0;

			var actionsButtonsInfo = this.getOwnerComponent().getSemanticHelper().getCurrentUIState().actionButtonsInfo;

			var nextLayout = actionsButtonsInfo.midColumn.closeColumn;
			nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(0).layout;

			if (endColumn) {
				nextLevel = 1;
				nextLayout = actionsButtonsInfo.endColumn.closeColumn;
				nextLayout = nextLayout ? nextLayout : this.getOwnerComponent().getSemanticHelper().getNextUIState(1).layout;
			}

			var pageName = this.oView.sViewName.split('.');
			pageName = pageName[pageName.length - 1];
			var routePattern = this.oRouter.getRoute(pageName).getPattern().split('/');
			var contextFilter = new RegExp('^:.+:$');
			var pagePattern = routePattern.filter(function (pattern) {
				var contextPattern = pattern.match(contextFilter);
				return contextPattern === null || contextPattern === undefined;
			});

			var nextPage = pagePattern[nextLevel];
			this.oRouter.navTo(nextPage, {
				layout: nextLayout
			});

		},
		onInit: function () {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRouteMatched(this.handleRouteMatched, this);
			this.oFclModel = this.getOwnerComponent().getModel("FclRouter");
			this.oFclModel.setProperty('/targetAggregation', 'beginColumnPages');
			this.oFclModel.setProperty('/expandIcon', {});
			this.oView.setModel(new sap.ui.model.json.JSONModel({}), 'fclButton');
			this.BusyDialog = sap.ui.xmlfragment("com.sap.build.ba293bd41-us_1.manageMeasuringPoint.fragments.busyDialog", this);
			this.getView().addDependent(this.BusyDialog);
			
			// this.oViewModel = new sap.ui.model.json.JSONModel({
			// 	busy: true
			// });
			// this.getView().setModel(this.oViewModel, "ViewModel"); //  Viewmodel

		},
		onExit: function () {

			// to destroy templates for bound aggregations when templateShareable is true on exit to prevent duplicateId issue
			var aControls = [{
				"controlId": "sap_List_Page_0-content-sap_m_ObjectList-1",
				"groups": ["items"]
			}];
			for (var i = 0; i < aControls.length; i++) {
				var oControl = this.getView().byId(aControls[i].controlId);
				if (oControl) {
					for (var j = 0; j < aControls[i].groups.length; j++) {
						var sAggregationName = aControls[i].groups[j];
						var oBindingInfo = oControl.getBindingInfo(sAggregationName);
						if (oBindingInfo) {
							var oTemplate = oBindingInfo.template;
							oTemplate.destroy();
						}
					}
				}
			}

		}
	});
}, /* bExport= */ true);
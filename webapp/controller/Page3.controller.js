var ci_att1 = [];
var ci_obj1, download;

sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/UploadCollectionParameter",
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, ODataModel, JSONModel, MessageBox, MessageToast, UploadCollectionParameter, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.ba293bd41-us_1.manageMeasuringPoint.controller.Page3", {
		handleRouteMatched: function (oEvent) {
			
				var none = "None";	
			 this.getView().getModel("oGlobalModel").setProperty("/modeDelete", none);
			
			
			this.ci_att1 = [];/*s*/

			

		//	this.getView().byId("UploadCollection").setVisible(false);
		
			this.getView().byId("UploadCollection1").setVisible(true);
			
			
			// this.getView().byId("UploadCollection").setVisible(false);
			// this.getView().byId("ci_fileUploader1").setVisible(false);
			
		
		

			/*Function for the Display mode in the detail Page*/
			this.getView().byId("objh").setObjectSubtitle("IK03");
			this.getView().byId("edit").setVisible(true);
			this.getView().byId("save").setVisible(false);
			this.getView().byId("canc").setVisible(false);
			this.getView().byId("longtext").setEditable(false);
			this.getView().byId("description").setEditable(false);
			this.getView().byId("pos").setEditable(false);
			this.getView().byId("ci_fileUploader1").setEnabled(false);
			this.getView().byId("codegrp").setEditable(false);
			this.getView().byId("lowerrange").setEditable(false);
			this.getView().byId("upperrange").setEditable(false);
			this.getView().byId("target").setEditable(false);
			this.getView().byId("overflow").setEditable(false);
			this.getView().byId("estimate").setEditable(false);
			this.getView().byId("text2").setEditable(false);
			this.getView().byId("longtext").setEditable(false);
		//	this.getView().byId("UploadCollection").setVisible(false);

			var oArgs = oEvent.getParameter("arguments");
			this.measure = oArgs["measuring"];
			console.log("measure:", this.measure);
			this.syssts = oArgs["status"];
			var that = this;
			var sPath = "/MesPointGetDetailSet('" + this.measure + "')";
			var oModel = new sap.ui.model.odata.ODataModel('/sap/opu/odata/sap/ZPM_MEASURE_DOCUMENT_SRV', true);
			oModel.read(sPath, {
				success: function (oData, oResponse) {

					// seting the values for details page
					console.log(oData);
					that.getView().byId("objh").setObjectTitle(oData.MeasuringPoint);
					that.getView().byId("objh").setObjectSubtitle("IK03");
					that.getView().byId("description").setValue(oData.MeasuringPointDes);
					that.getView().byId("pos").setValue(oData.Position);
					that.getView().byId("char").setValue(oData.CharacteristicName + ' ' + oData.CharacteristicNameDes);
					that.getView().byId("codegrp").setValue(oData.CodeGrp + ' ' + oData.CodeGroupDes);
					that.getView().byId("target").setValue(oData.TargetValue);
					that.getView().byId("longtext").setValue(oData.DocuText);
					that.getView().byId("lowerrange").setValue(oData.LowerRangeLimit);
					that.getView().byId("upperrange").setValue(oData.UpperLimitRange);
					that.getView().byId("unit").setValue(oData.Unit + ' ' + oData.UnitDes);
					that.getView().byId("overflow").setValue(oData.CounterReading);
					that.getView().byId("estimate").setValue(oData.AnnualEstimate);
					that.getView().byId("text2").setValue(oData.DocuText);

					that.show();

					// getting the values for details page
					// that.a = that.getView().byId("objh").getObjectTitle();
					// alert(that.a);
					// //that.IK03 = that.getView().byId("objh").getValue();
					that.MeasuringPointDes = that.getView().byId("description").getValue();
					//alert(that.MeasuringPointDes);
					that.Position = that.getView().byId("pos").getValue();
					that.CharacteristicName = that.getView().byId("char").getValue();
					that.CodeGrp = that.getView().byId("codegrp").getValue();
					that.TargetValue = that.getView().byId("target").getValue();
					that.DocuText = that.getView().byId("longtext").getValue();
					//alert(that.DocuText);
					that.LowerRangeLimit = that.getView().byId("lowerrange").getValue();
					that.UpperLimitRange = that.getView().byId("upperrange").getValue();
					//that.Unit = that.getView().byId("unit").getValue();
					that.CounterReading = that.getView().byId("overflow").getValue();
					that.AnnualEstimate = that.getView().byId("estimate").getValue();
					that.text1 = that.getView().byId("text2").getValue();
					that.DocuText2 = that.getView().byId("text2").getValue();
					//alert(that.DocuText2);

				}

			});
			
			/*Condition For Dialog After clicking the List*/
			this._listout = " ";
			this.getView().getModel("oGlobalModel").setProperty("/listpress", "");
			
			that.getView().byId("UploadCollection").setVisible(false);
			that.getView().byId("ci_fileUploader1").setVisible(false);
			

			this.codeGrp();
			this.tableBind();

			if (this.syssts === "Pointer") {

				//alert("Pointer");
				this.getView().byId("point").setVisible(true);
				this.getView().byId("point2").setVisible(true);
				this.getView().byId("count").setVisible(false);
				this.getView().byId("count2").setVisible(false);
				this.radio = "";

				this.value = this.getView().byId("longtext").getValue();

			} else if (this.syssts === "Counter") {

				this.getView().byId("count").setVisible(true);
				this.getView().byId("count2").setVisible(true);
				this.getView().byId("point").setVisible(false);
				this.getView().byId("point2").setVisible(false);
				this.radio = "X";

				this.value = this.getView().byId("text2").getValue();

			}

		},
		// onAfterRendering: function () {
			
		// 		var element = document.getElementById("__layout6-spacer");
			
		// 		element.parentNode.removeChild(element);
				
		// 	},

		codeGrp: function (oData, oResponse) {
			var codegrp = this.getView().byId("codegrp");
			var oModel = new ODataModel('/sap/opu/odata/sap/zpm_f4_srv', true);
			oModel.read("/CodeGroupSet?$filter=Catalog eq ' '", {

				success: function (oData, oResponse) {
					var group = oData.results[0].CodeGrp;
					var dups = [];
					var arr = oData.results.filter(function (el) {
						if (dups.indexOf(el.CodeGrp) == -1) {
							dups.push(el.CodeGrp);
							return true;
						}
						return false;
					});
					var arr6i = {
						"arr6i": arr
					};

					var oItems = new sap.ui.core.ListItem({
						key: "{CodeGrp}",
						text: "{CodeGrp} {CodeGroupDes}"
					});
					var oModel6i = new sap.ui.model.json.JSONModel(arr6i);
					codegrp.setModel(oModel6i);
					codegrp.bindItems("/arr6i", oItems);
				}
			});
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
		_onUploadCollectionUploadComplete: function (oEvent) {

			var oFile = oEvent.getParameter("files")[0];
			var iStatus = oFile ? oFile.status : 500;
			var sResponseRaw = oFile ? oFile.responseRaw : "";
			var oSourceBindingContext = oEvent.getSource().getBindingContext();
			var sSourceEntityId = oSourceBindingContext ? oSourceBindingContext.getProperty("ID") : null;
			var oModel = this.getView().getModel();

			return new Promise(function (fnResolve, fnReject) {
				if (iStatus !== 200) {
					fnReject(new Error("Upload failed"));
				} else if (oModel.hasPendingChanges()) {
					fnReject(new Error("Please save your changes, first"));
				} else if (!sSourceEntityId) {
					fnReject(new Error("No source entity key"));
				} else {
					try {
						var oResponse = JSON.parse(sResponseRaw);
						var oNewEntityInstance = {};

						oNewEntityInstance[""] = oResponse["ID"];
						oNewEntityInstance[""] = sSourceEntityId;
						oModel.createEntry("", {
							properties: oNewEntityInstance
						});
						oModel.submitChanges({
							success: function (oResponse) {
								var oChangeResponse = oResponse.__batchResponses[0].__changeResponses[0];
								if (oChangeResponse && oChangeResponse.response) {
									oModel.resetChanges();
									fnReject(new Error(oChangeResponse.message));
								} else {
									oModel.refresh();
									fnResolve();
								}
							},
							error: function (oError) {
								fnReject(new Error(oError.message));
							}
						});
					} catch (err) {
						var message = typeof err === "string" ? err : err.message;
						fnReject(new Error("Error: " + message));
					}
				}
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onUploadCollectionChange: function (oEvent) {

			var oUploadCollection = oEvent.getSource();
			var aFiles = oEvent.getParameter('files');

			if (aFiles && aFiles.length) {
				var oFile = aFiles[0];
				var sFileName = oFile.name;

				var oDataModel = this.getView().getModel();
				if (oUploadCollection && sFileName && oDataModel) {
					var sXsrfToken = oDataModel.getSecurityToken();
					var oCsrfParameter = new sap.m.UploadCollectionParameter({
						name: "x-csrf-token",
						value: sXsrfToken
					});
					oUploadCollection.addHeaderParameter(oCsrfParameter);
					var oContentDispositionParameter = new sap.m.UploadCollectionParameter({
						name: "content-disposition",
						value: "inline; filename=\"" + encodeURIComponent(sFileName) + "\""
					});
					oUploadCollection.addHeaderParameter(oContentDispositionParameter);
				} else {
					throw new Error("Not enough information available");
				}
			}

		},
		_onUploadCollectionTypeMissmatch: function () {
			return new Promise(function (fnResolve) {
				sap.m.MessageBox.warning(
					"The file you are trying to upload does not have an authorized file type (JPEG, JPG, GIF, PNG, TXT, PDF, XLSX, DOCX, PPTX).", {
						title: "Invalid File Type",
						onClose: function () {
							fnResolve();
						}
					});
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err);
				}
			});

		},
		_onFileUploaderChange: function () {
			var oFileuploader = this.getView().byId("ci_fileUploader1");
			this.ci_attach1 = this.getView().byId("UploadCollection");
			
			var len = oFileuploader.length;
			console.log("number:", len);
			var sFilename = oFileuploader.getValue();

			//	baseval = [" "," "," "," "," "];
			var file = jQuery.sap.domById(oFileuploader.getId() + "-fu").files[0];

			var base64_marker = 'data:' + file.type + ';base64,';

			var filename = sFilename.replace(/(\.[^/.]+)+$/, ""); // File Name
			var fileext = sFilename.slice((sFilename.lastIndexOf(".") - 1 >>> 0) + 2); // File Extension
			var sfileext = fileext.substring(0, 3);
			var tsfileext = sfileext.toUpperCase();
			var that = this;
			var baseval = [];
			if (file) {
				var reader = new FileReader();

				reader.onload = function (readerEvt) {
					var binaryString = readerEvt.target.result;
					var base64 = btoa(binaryString);

					oFileuploader.setValue();
					baseval.push(base64);
					var ci_obj1 = {
						Name: filename,
						Ext: tsfileext,
						Base64: base64
					};
					that.ci_att1.push(ci_obj1);

					var oModel = new sap.ui.model.json.JSONModel(that.ci_att1);
					that.ci_attach1.setModel(oModel);
					var oItems = new sap.m.ObjectListItem({
						icon: {
							path: "Ext",
							formatter: function (subject) {
								var lv = subject;
								if (lv === 'TXT') {
									return "sap-icon://document-text";
								} else if (lv === 'JPG' || lv === 'PNG' || lv === 'BMP') {
									return "sap-icon://attachment-photo";
								} else if (lv === 'PDF') {
									return "sap-icon://pdf-attachment";
								} else if (lv === 'DOC') {
									return "sap-icon://doc-attachment";
								} else if (lv === 'XLS') {
									return "sap-icon://excel-attachment";
								} else if (lv === 'MP3') {
									return "sap-icon://attachment-audio";
								} else if (lv === 'XLS') {
									return "sap-icon://excel-attachment";
								} else if (lv === 'PPT') {
									return "sap-icon://ppt-attachment";
								} else {
									return "sap-icon://document";
								}

							}
						},
						title: "{Name}.{Ext}",
						type: "Active"
					});
					that.ci_attach1.bindItems("/", oItems);
					that.getView().getModel("oGlobalModel").setProperty("/ci_att1", that.ci_att1);

				};

			}

			reader.readAsBinaryString(file);

		},
		_onUploadCollectionFileSizeExceed: function () {
			return new Promise(function (fnResolve) {
				sap.m.MessageBox.warning("The file you are trying to upload is too large (10MB max).", {
					title: "File Too Large",
					onClose: function () {
						fnResolve();
					}
				});
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err);
				}
			});

		},
		ci_handleDelete: function (oEvent) {
			var path = oEvent.getParameter('listItem').getBindingContext().getPath();
			var idx = parseInt(path.substring(path.lastIndexOf('/') + 1));
			var list_ID = sap.ui.getCore().byId(oEvent.getSource().sId);

			var Data = list_ID.getModel();

			var d = Data.getData();
			d.splice(idx, 1);
			Data.setData(d);
		},
		_onButtonPress: function () {
			
			var that= this;
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to edit this Measuring Point?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Information Message",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {

						if (oAction == "YES") {

			that._listout = "X";
			that.getView().getModel("oGlobalModel").setProperty("/listpress", that._listout);
			console.log("that._listout", that._listout);
			
				var del = "Delete";
				that.getView().getModel("oGlobalModel").setProperty("/modeDelete", del);
			
			that.getView().byId("UploadCollection1").setVisible(true);
			that.getView().byId("UploadCollection").setVisible(true);
			that.getView().byId("ci_fileUploader1").setVisible(true);
		
			that.getView().byId("objh").setObjectSubtitle("IK02");
			that.getView().byId("save").setVisible(true);
			that.getView().byId("canc").setVisible(true);
			that.getView().byId("edit").setVisible(false);
			that.getView().byId("longtext").setEnabled(true);
			that.getView().byId("description").setEditable(true);
			that.getView().byId("pos").setEditable(true);
			that.getView().byId("ci_fileUploader1").setEnabled(true);
			that.getView().byId("codegrp").setEditable(true);
			that.getView().byId("lowerrange").setEditable(true);
			that.getView().byId("upperrange").setEditable(true);
			that.getView().byId("target").setEditable(true);
			that.getView().byId("overflow").setEditable(true);
			that.getView().byId("estimate").setEditable(true);
			that.getView().byId("text2").setEditable(true);
			that.getView().byId("longtext").setEditable(true);
						}
						else if (oAction === "NO") {
							
						
						
						// var del = "Delete";
						// that.getView().getModel("oGlobalModel").setProperty("/modeDelete", del);
						
							var none = "None";
						that.getView().getModel("oGlobalModel").setProperty("/modeDelete", none);


						}
					}

				});
			
			
			
		
		},
		cancelPress: function (oEvent) {
			
			var that = this;
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to cancel the changes?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Information Message",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {

						if (oAction == "YES") {
							// setting editable false		
								var none = "None";
						that.getView().getModel("oGlobalModel").setProperty("/modeDelete", none);
							
						
							
							that.getView().byId("objh").setObjectSubtitle("IK03");
							that.getView().byId("edit").setVisible(true);
							that.getView().byId("save").setVisible(false);
							that.getView().byId("canc").setVisible(false);
							that.getView().byId("longtext").setEditable(false);
							that.getView().byId("description").setEditable(false);
							that.getView().byId("pos").setEditable(false);
							that.getView().byId("ci_fileUploader1").setEnabled(false);
							that.getView().byId("codegrp").setEditable(false);
							that.getView().byId("lowerrange").setEditable(false);
							that.getView().byId("upperrange").setEditable(false);
							that.getView().byId("target").setEditable(false);
							that.getView().byId("overflow").setEditable(false);
							that.getView().byId("estimate").setEditable(false);
							that.getView().byId("text2").setEditable(false);
							that.getView().byId("longtext").setEditable(false);
							
							that.getView().byId("UploadCollection1").setVisible(true);
							that.getView().byId("UploadCollection").setVisible(false);
							that.getView().byId("ci_fileUploader1").setVisible(false);
							//	setting the binding values 
						
							that.getView().byId("description").setValue(that.MeasuringPointDes);
							that.getView().byId("pos").setValue(that.Position);
							that.getView().byId("char").setValue(that.CharacteristicName);
							that.getView().byId("codegrp").setValue(that.CodeGrp);
							that.getView().byId("target").setValue(that.TargetValue);
							that.getView().byId("longtext").setValue(that.DocuText);
							that.getView().byId("lowerrange").setValue(that.LowerRangeLimit);
							that.getView().byId("upperrange").setValue(that.UpperLimitRange);
							//that.getView().byId("unit").setValue(that.Unit);
							that.getView().byId("overflow").setValue(that.CounterReading);
							that.getView().byId("estimate").setValue(that.AnnualEstimate);
							that.getView().byId("text2").setValue(that.DocuText2);
							
							
						} else if (oAction === "NO") {
							
						
						
							var del = "Delete";
						that.getView().getModel("oGlobalModel").setProperty("/modeDelete", del);


						}
					}

				});

		},

		/*Restrict Value in Lower Range Limit*/
		lowrng: function (oEvent) {

			var that = this;
			var _oInput = oEvent.getSource();
			that.len = _oInput.getValue();
			that.val = _oInput.getValue().length;
			if (that.val > 22) {
				that.l = that.len.slice(0, 21);
				that.getView().byId("lowerrange").setValue(that.l);
			} else {

			}

		},

		/*Restrict Value in Upper Range Limit*/
		uprng: function (oEvent) {

			var that = this;
			var _oInput = oEvent.getSource();
			that.len = _oInput.getValue();
			that.val = _oInput.getValue().length;
			if (that.val > 22) {
				that.l = that.len.slice(0, 21);
				that.getView().byId("upperrange").setValue(that.l);
			} else {

			}

		},

		/*Restrict Value in Target Value*/
		tarval: function (oEvent) {

			var that = this;
			var _oInput = oEvent.getSource();
			that.len = _oInput.getValue();
			that.val = _oInput.getValue().length;
			if (that.val > 22) {
				that.lval = that.len.slice(0, 21);
				that.getView().byId("target").setValue(that.lval);
			} else {

			}

		},

		/*Restrict Value in Counter Overflow */
		countover: function (oEvent) {

			var that = this;
			var _oInput = oEvent.getSource();
			that.len = _oInput.getValue();
			that.val = _oInput.getValue().length;
			if (that.val > 22) {
				that.l = that.len.slice(0, 21);
				that.getView().byId("overflow").setValue(that.l);
			} else {

			}

		},

		/*Restrict Value in Annual Estimate */
		annesti: function (oEvent) {

			var that = this;
			var _oInput = oEvent.getSource();
			that.len = _oInput.getValue();
			that.val = _oInput.getValue().length;
			if (that.val > 22) {
				that.l = that.len.slice(0, 21);
				that.getView().byId("estimate").setValue(that.l);
			} else {

			}

		},

		tableBind: function () {

			//	debugger;
			var table1 = this.getView().byId("tab1");

			var oModel = new ODataModel("/sap/opu/odata/sap/ZPM_MEASURE_DOCUMENT_SRV/", true);
			var oModelJson = new sap.ui.model.json.JSONModel();
			console.log("Measurept oModel:", this.measure);

			var sPath = "/MeasuringDocumentHistorySet?$filter=Point eq '" + this.measure + "' ";
			//debugger;
			//	var oFilter = [new sap.ui.model.Filter("Point", sap.ui.model.FilterOperator.EQ, this.measure)]; //this.funLoc1
			oModel.read(sPath, {
				//	filters: oFilter, //"K1-B01-1")],
				success: function (oData, oResponse) {

					console.log("Function oModel:", oData);

					oModelJson.setData(oData);
					var oTemplate = new sap.m.ColumnListItem({

						cells: [
							new sap.m.ObjectIdentifier({
								title: "{MDocument}"
							}),

							new sap.m.Text({
								text: "{path:'Date', type:'sap.ui.model.type.Date',formatOptions: {pattern: 'dd.MM.yyyy'}}"
							}),

							new sap.m.Text({
								text: "{path:'Time',type: 'sap.ui.model.odata.type.Time',formatOptions: {style: 'medium'}}"

							}),

							new sap.m.Text({
								text: "{Reading}"
							}),

							new sap.m.Text({
								text: "{ValCode}"
							}),

							new sap.m.Text({
								text: "{MText}"
							}),

							new sap.m.Text({
								text: "{TakenBy}"
							})

						]
					});
					table1.setModel(oModelJson);
					table1.bindItems("/results", oTemplate);

				}

			});

		},
		/*Function for the fragment message while Posting*/
		msgtableok: function () {

			//alert("Pressed");

			var inf_arr = [];

			var err_arr = [];

			var rowItems = sap.ui.core.Fragment.byId("messagefragment", "Msgtab").getItems();

			//	this.msg.close();

			var tablength = rowItems.length;

			console.log("tablength", tablength);

			for (var i = 0; i < tablength; i++) {

				var item = rowItems[i];

				var Cells = item.getCells();

				var tp = Cells[0].getText();

				if (tp === "Success") {

					var inf = {
						tp: tp
					};

					inf_arr.push(inf);

					var len_inf = inf_arr.length;

				} else if (tp === "Error") {

					var err = {
						tp: tp
					};

					err_arr.push(err);

					var len_err = err_arr.length;

				}

			}

			if (len_inf === tablength) {

				// this.getView().byId("disp_conf_btn").setVisible(false);

				window.location.reload();

			} else {

				//	this.getView().byId("disp_conf_btn").setVisible(true);

			}

			this.msg.close();

		},

		DMS: function () {

			this.desc = this.getView().byId("description").getValue();

			ci_att1 = this.getView().getModel("oGlobalModel").getProperty("/ci_att1");
			console.log("Array", ci_att1);
			var oUploadCollection = this.getView().byId("UploadCollection");
		//	debugger;

			this.user = parent.sap.ushell.Container.getUser().getId();
			var arr142 = [];
			var arrp = [];
			var count = ci_att1.length;
			console.log("count :", count);
			var that = this;
			for (var i = 0; i < count; i++) {
				var dmsdata = {
					"DocType": ci_att1[i].Ext,
					"FileName": ci_att1[i].Name,
					"Base64": ci_att1[i].Base64

				};
				arr142.push(dmsdata);
			}
			var obj = {
				"d": {
					"ProcessName": "CreateMP",
					"Description": that.desc,
					"Username": that.user,
					"NotificationNo": that.measure,
					"To_DMSItems": arr142
				}
			};
			arrp.push(obj);
			//
			console.log(obj);
			var oModel142 = new ODataModel("/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/", true);
			var sPath = "/DMS_HeaderSet";

			oModel142.create(sPath, obj, {
				success: function (oData, oResponse) {
					console.log(oData);
					var msg = oData.ReturnMessage;
					//alert(msg);
					//	debugger;
					var typ = oData.ReturnType;
					console.log(typ, "type");
					if (typ == "S") {

						MessageToast.show(msg);
					} else
						MessageToast.show(msg);

				},
				error: function (oData, oResponse) {

					MessageToast.show("Error");

				}

			});

		},
		
		downListPress: function (oEvent) {
				var that = this;
				that.fle1 = oEvent.getParameter("listItem").getBindingContext().getProperty().Name;
				that.ext2 = oEvent.getParameter("listItem").getBindingContext().getProperty().Ext;
				that.docnum = oEvent.getParameter("listItem").getBindingContext().getProperty().Doc;

				sap.m.MessageBox.show(
					"Do you want to download the Attachment ?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirmation Message",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function (oAction) {
							// notify user
							if (oAction == "YES") {
								that.fle = that.fle1.toUpperCase();
								console.log("that.fle", that.fle);
								that.ext = that.ext2.toUpperCase();
								console.log("that.ext", that.ext);
								var oModel3 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/", true);
								var sPath = "/DMS_Base64Set?$filter=DocumentNum eq '" + that.docnum + "'and IFilename eq '" + that.fle + "." + that.ext +
									"'";
								oModel3.read(sPath, {
									success: function (oData, oResponse) {
										var length = oData.results.length;
									//	that.getView().getModel("oviewModel").setProperty("/busy", true);
										for (var i = 0; i < length; i++) {
											that.base64 = oData.results[i].LvBase64;
											that.doctype = oData.results[i].DocumentNum;
											console.log("that.doctype",that.doctype);
											that.downloads();
										}
									},

								});

							} else {

							}
						}
					});

			},
			downloads: function () {

				var that = this;
				//that.getView().getModel("oviewModel").setProperty("/busy", false);
				download("data:application/+ that.FileExt;base64," + that.base64, that.fle + "." + that.ext, "application");

			},
		
		show: function (oEvent) {

			//alert("passed")

			this.ci_att11 = [];
			var that = this;

			that.user = parent.sap.ushell.Container.getUser().getId();

			that.showatt = this.getView().byId("UploadCollection1");
			var sPath = "/DMSListSet?$filter=ILoginUser eq '" + that.user + "' and IProcess eq 'CreateMP' and IMaintId eq '" + that.measure + " '"; // " + that.measure + "               
			var oModeli = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV', this);
			//debugger;

			var that = this;
			oModeli.read(sPath, {
				success: function (oData, oResponse) {
					var len1 = oData.results.length;
					console.log("Documents Odata: ", oData);
					for (var i = 0; i < len1; i++) {
						 that.FileName = oData.results[i].FileName;
						 that.FileExt = oData.results[i].FileExt;
						that.docnum = oData.results[i].DocNumber;

						ci_obj1 = {
							 Name: that.FileName,
							 Ext: that.FileExt,
							Doc: that.docnum
						};
						that.ci_att11.push(ci_obj1);

					} //For Loop End
					var oItems = new sap.m.ObjectListItem({
						icon: {
							path: "Ext",
							formatter: function (subject) {
								var lv = subject;
								if (lv === 'TXT') {
									return "sap-icon://document-text";
								} else if (lv === 'JPG' || lv === 'PNG' || lv === 'BMP') {
									return "sap-icon://attachment-photo";
								} else if (lv === 'PDF') {
									return "sap-icon://pdf-attachment";
								} else if (lv === 'DOC') {
									return "sap-icon://doc-attachment";
								} else if (lv === 'XLS') {
									return "sap-icon://excel-attachment";
								} else if (lv === 'MP3') {
									return "sap-icon://attachment-audio";
								} else if (lv === 'XLS') {
									return "sap-icon://excel-attachment";
								} else if (lv === 'PPT') {
									return "sap-icon://ppt-attachment";
								} else {
									return "sap-icon://document";
								}

							}
						},
						title: "{Name}.{Ext}",
						type: "Active",
					});
					that.showatt.bindItems("/", oItems);
					var aModel = new sap.ui.model.json.JSONModel(that.ci_att11);

					that.showatt.setModel(aModel);

				}
			});



		},

		post: function () {
			//debugger;
			var that = this;

			that.desc = this.getView().byId("description").getValue(); //////For the Description
			that.cdegrp = this.getView().byId("codegrp").getSelectedKey(); //////////For The Code Group
			that.lowRang = this.getView().byId("lowerrange").getValue(); //// For Lower Range Limit
			var load = that.lowRang.split(".");
			var loadis = load[0];
		
			that.upRang = this.getView().byId("upperrange").getValue(); ////For Upper Range Limit
			var load1 = that.upRang.split(".");
			var loadis1 = load1[0];
			that.target = this.getView().byId("target").getValue(); ///// For Target Value
			var load4 = that.target.split(".");
			var loadis4 = load4[0];
			//alert(that.target);
			that.overflow = this.getView().byId("overflow").getValue(); //// for Counter Overflow Reading
			var load2 = that.overflow.split(".");
			var loadis2 = load2[0];
			that.annual = this.getView().byId("estimate").getValue(); ////// For Annual Estimate
			var load3 = that.annual.split(".");
			var loadis3 = load3[0];
			if (that.radio === "") {

				that.value = this.getView().byId("longtext").getValue(); /////// For Long Text for Pointer
				//alert(that.value);

			} else if (that.radio === "X") {

				that.value = this.getView().byId("text2").getValue(); /////// For Long Text for counter
				that.target = "";
				

			}

			that.posi = this.getView().byId("pos").getValue(); ///// For Position

			that.table = sap.ui.core.Fragment.byId("messagefragment", "Msgtab"); ///// For Table Message

			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to Save the Changes?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Information Message",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						// notify user
						if (oAction == "YES") {

							var postdata = {

								"MeasuringPoint": that.measure,
								"MeasuringPointDes": that.desc,
								"Position": that.posi,
								"CodeGrp": that.cdegrp,
								"Counter": that.radio,
								"TargetValue": loadis4,
								"CounterReading": loadis2,
								"AdditionalText": that.value,
								"AnnualEstimate": loadis3,
								"LowerRangeLimit": loadis,
								"UpperLimitRange": loadis1,
								"DecimalPlaces": "3",
								"ToReturn": [{
									"Type": "",
									"Message": ""
								}]

							};

							//	that.busyDialogFun();
							console.log("Postdata:", postdata);

							var oModel3 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPM_MEASURING_POINT_SRV/", true);

							var pos = [];

							var sPath = "/ChangeMeasuringPointSet";
							oModel3.create(sPath, postdata, {
								success: function (oData, oResponse) {
									console.log(oData, "oData");

									that.msg1 = oData.ToReturn.results[0].Message;

									var tablen = oData.ToReturn.results.length;

									for (var j = 0; j < tablen; j++) {

										var Type = oData.ToReturn.results[j].Type;
										console.log("Type", Type);

										if (Type === "I") {

											Type = "Information";
											console.log("Type", Type);

										} else if (Type === "S") {

											Type = "Success";
											console.log("Type", Type);

										} else if (Type === "E") {

											Type = "Error";
											console.log("Type", Type);

										} else if (Type === "W") {

											Type = "Warning";
											console.log("Type", Type);

										}

										var Message = oData.ToReturn.results[j].Message;
										console.log("Message", Message);

										var obj = {
											Type2: Type,
											Message: Message
										};

										pos.push(obj);

									}

									that.msg.open();

									var oTemplate = new sap.m.ColumnListItem({

										cells: [
											new sap.m.Text({
												text: "{Type2}"
											}),

											new sap.m.Text({
												text: "{Message}"
											})
										]
									});

									var oModelJson = new sap.ui.model.json.JSONModel();
									oModelJson.setData({
										tabdata1: pos
									});
									that.table.setModel(oModelJson);
									that.table.bindItems("/tabdata1", oTemplate);

									that.manMeaspt = that.msg1.slice(19, 23);

									ci_att1 = that.getView().byId("UploadCollection").getItems().length;

									if (ci_att1 == '0') {

									} else {

										that.DMS();

									}

								},
								error: function (oData, oResponse) {

									var msg1 = oData.Message;

									sap.m.MessageBox.warning(msg1 + " ", {
										icon: sap.m.MessageBox.Icon.WARNING,
										title: "Warning",
										actions: [sap.m.MessageBox.Action.OK],

									});
								}
							});
						} else if (oAction == "NO") {

						}
					}

				});

		},


		onInit: function () {
			
		
			
			var oInput = this.byId("target"); /////For the Target Value
			oInput.attachBrowserEvent("mousewheel", function (oEvent) {
				oEvent.preventDefault();
			});

			var oInput2 = this.byId("lowerrange"); ////For Lower Range Limit
			oInput2.attachBrowserEvent("mousewheel", function (oEvent) {
				oEvent.preventDefault();
			});

			var oInput3 = this.byId("upperrange"); ////For Upper Range Limit
			oInput3.attachBrowserEvent("mousewheel", function (oEvent) {
				oEvent.preventDefault();
			});

			var oInput4 = this.byId("estimate"); /////For Annual Estimate
			oInput4.attachBrowserEvent("mousewheel", function (oEvent) {
				oEvent.preventDefault();
			});

			var oInput5 = this.byId("overflow"); //// For  Counter Overflow Reading
			oInput5.attachBrowserEvent("mousewheel", function (oEvent) {
				oEvent.preventDefault();
			});
			
			// var none = "None";	
			//  this.getView().getModel("oGlobalModel").setProperty("/modeDelete", none);
			 
			
			 
			
			
			//this._listout = this.getView().getModel("oGlobalModel").setProperty("/listpress", "");
			//  console.log(this._listout);

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRouteMatched(this.handleRouteMatched, this);
			this.oFclModel = this.getOwnerComponent().getModel("FclRouter");
			this.oFclModel.setProperty('/targetAggregation', 'midColumnPages');
			this.oFclModel.setProperty('/expandIcon', {});
			this.oView.setModel(new sap.ui.model.json.JSONModel({}), 'fclButton');

			this.msg = sap.ui.xmlfragment("messagefragment", "com.sap.build.ba293bd41-us_1.manageMeasuringPoint.fragments.message", this);
			this.getView().addDependent(this.msg); /*Calling the Fragment for the Message Dialog after Posting*/

		}
	});
}, /* bExport= */ true);
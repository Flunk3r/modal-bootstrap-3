var jModal = function(options){
	
	var opt = {
		title : "Information",
		content : "",
		btn : [{
			id : "close-modal",
			content : "Fermer",
			class : "btn-default",
			ico : "fa-times",
			close : true,
			onClick : ""
		}],
		id : "modal",
		type : "info",
		onClose : function(){}
	};
	
	
	options || (options = {});
	
	opt = $.extend(opt, options);
	
	this.title = opt.title;
	this.content = opt.content;
	this.btn = opt.btn;
	this.id = opt.id;
	this.type = opt.type;
	this.onClose = opt.onClose;
	
	this.show();
	
	return this;
};

jModal.prototype.show = function()
{
	this.create();
	this.addContent();
	
	var m = this.modal;
	
	this.modal.on("hide.bs.modal",this.onClose);
	
	this.modal.on("hidden.bs.modal",function(){
		$(this).remove();
	});
	
	
	this.modal.find("button.close-modal").on("click",function(){
		m.modal("hide");
	});
	
	if(this.type == "confirm")
		this.modal.modal({backdrop:'static'});
	
	this.modal.modal("show");
	
	return this;
};

jModal.prototype.addContent = function()
{
	this.modal.find(".modal-header").addClass("modal-"+this.type);
	this.modal.find(".modal-title").html(this.title);
	this.modal.find(".modal-body").html(this.content);
	
	var t = this;
	
	this.btn.forEach(function(btn){
		t.addBtn(btn);
	});
}

jModal.prototype.addBtn = function(btn)
{
	var t = this;
	var footer = this.modal.find(".modal-footer");
	
	var button = $("<button/>",{"id":btn.id}).addClass("btn "+btn.class);
	
	if(btn.close)
		button.addClass("close-modal")
	
	if(btn.onClick != "")
		button.on("click",btn.onClick);
	
	var ico = $("<i/>").addClass("fa fa-fw "+btn.ico);
	
	if(btn.ico != "")
		button.append(ico);
	
	button.append($("<span/>").html(btn.content));
	
	footer.append(button);
}
jModal.prototype.create = function()
{
	this.modal = 
		$("<div/>",{"id":this.id,"role":"dialog"})
			.addClass("modal fade")
			.append(
				$("<div/>",{"role":"document"})
					.addClass("modal-dialog")
					.append(
						$("<div/>")
							.addClass("modal-content")
							.append(
								$("<div/>")
									.addClass("modal-header")
									.append(
										$("<h4/>")
											.addClass("modal-title")
									)
							)
							.append(
								$("<div/>")
									.addClass("modal-body")
							)
							.append(
								$("<div/>")
									.addClass("modal-footer")
							)
					)
			)
	
};

function mInfo(content,onClose)
{
	new jModal({
		content : content,
		type : "info",
		onClose : onClose
	});
}

function mAlert(content,onClose)
{
	new jModal({
		content : content,
		type : "warning",
		onClose : onClose
	});
}

function mErreur(content,onClose)
{
	new jModal({
		title: "Erreur",
		content : content,
		type : "danger",
		onClose : onClose
	});
}
function mConfirm(content,onSuccess,onCancel)
{
	var title = "Attention";
	
	var btn = [
		{
			id : "modal-success",
			content : "Oui",
			class : "btn-success",
			ico : "fa-check",
			close : true,
			onClick : onSuccess
		},
		{
			id : "modal-cancel",
			content : "Non",
			class : "btn-danger",
			ico : "fa-times",
			close : true,
			onClick : onCancel
		}
	];
	
	new jModal({
		title : title,
		content : content,
		type : "confirm",
		btn : btn
	});
}
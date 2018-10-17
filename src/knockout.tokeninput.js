ko.bindingHandlers.tokenInput = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        // debugger;
        this.settings = allBindingsAccessor().settings;
        var self = this;
        var url_or_data = settings.url ? settings.url : settings.local_data;
        this.items = valueAccessor();
        element.isUpdating = false;
        $(element).tokenInput(url_or_data, $.extend(settings, {
            prePopulate: self.items,
            onAdd: function (item) {
                if (!element.isUpdating) {
                    element.isUpdating = true;
                    try {
                        self.items.push(item);
                    } finally {
                        element.isUpdating = false;
                    }
                }
            },
            onDelete: function(item) {
                if (!element.isUpdating) {
                    element.isUpdating = true;
                    try {
                        if(settings.onDeleteCallbackFunction)
                            settings.onDeleteCallbackFunction.call(this, self.items, item);
                        else
                            self.items.remove(item);    // use a generic deletion (for Knockout we need to do property based lookup so this won't work)
                    } finally {
                        element.isUpdating = false;
                    }
                }
            }
        }));

        this.items.subscribe(function(data) {
        });
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var params = ko.toJS(valueAccessor());
        // debugger;
        if (!element.isUpdating) {
            element.isUpdating = true;
            try {
                $(element).tokenInput("clear");
                for (var i = 0; i < params.length; i++) {
                    $(element).tokenInput("add", params[i]);
                }
            } finally {
                element.isUpdating = false;
            }
        }
    }
};
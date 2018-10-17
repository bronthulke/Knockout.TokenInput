Knockout.TokenInput
===================

Forked from https://github.com/avi1989/Knockout.TokenInput/blob/master/src/knockout.tokeninput.js to better handle Knockout objects and local data

This is a Knockout Binding for the Jquery.Tokeninput control (http://loopj.com/jquery-tokeninput/). 

The control is very simple to use and allows any of the configurations mentioned in the website above to be used. 


The following is an example using a URL to search:

    <input type="text" data-bind="ko_tokenInput: list,
        settings: {
            url: '/api/SampleDataApi/TokenSearch/',
            disabled: false,
            minChars: 2,
            queryParam: q,
        }
    "/>

The following is an example using local data to search, and demonstrating the use of the custom delete callback:

    <input type="text" data-bind="ko_tokenInput: list,
        settings: {
            local_data: ko.toJS(searchDataObsArray),
            allowFreeTagging: false,
            onDeleteCallbackFunction: $root.deleteFromList,
            minChars: 2,
            propertyToSearch: 'name',
            queryParam: q,
        }
    "/>

The onDeleteCallbackFunction is used to handle the removal of items when an observableArray is being used, as when using local_data the objects get flattened and then don't match when trying to remove a given item from the underlying data:

	self.deleteFromList = function(courts, courtToDelete) {
		courts.remove(function (item) { return item.id() == courtToDelete.id });
	};
// var knexConfig = require('./knexfile');
// var db = require('knex')(knexConfig);

$(document).ready( function () {

    var Item = Backbone.Model.extend({
        defaults : {
            "item": '',
            "priority": 0,
            "time": 0
        },
        urlRoot : "/todo"
    });

    // var itemModel = new Item();     
    var modelDeleting;
    var ItemView = Backbone.View.extend({
        render: function () {
            var item = this.model.get("item");
            var prior = this.model.get("priority");
            var time = this.model.get("time");
            var checkBox = '<input type="checkbox" id="checkbox"></input>';
            this.$el.html('<div class="listitem">Item to do: "' + item+'". Priority level: ' +prior+time+checkBox+'<br><br></div>');
        },
        initialize: function () {
            this.model.on("change", this.render, this);
        },
        events : {
            'click #checkbox': 'del'
        },
        del : function () {
            console.log('this.del function be running all over your faeeeeece');
            modelDeleting = this.model;
            this.model.destroy();
            this.remove();
        }
    });

    // var listView = new ItemView({model : itemModel});

    var ItemCollection = Backbone.Collection.extend({
        model : Item
    });

    var ItemCollectionView = Backbone.View.extend({
        render : function () {
            var itemLab = "<label>Item to do</label><br>";
            var item = '<input type="text" id="item" placeholder="Type your input here!"></input><br><br>';  
            var priorLab = '<label>Priority level</label><br>';
            var prior = '<select><option value="Meh">Meh</option><option value="Yeah I should do that...">Yeah, I should do that...</option><option value="Need to do this">Need to do this</option><option value="ASAP">ASAP</option></select>';
            var submit = '<button id="additem">Submit!</button>';
            var div = '<div id="todo-list"></div>';
            this.$el.html(itemLab + item + priorLab + prior + submit +div);
        },
        initialize : function () {
            this.listenTo(this.collection, 'add', this.addView);
            this.listenTo(this.collection, 'remove', this.delView);
        },
        events : {
            "click #additem" : "addModel",
        },
        addModel : function () {
            this.collection.add({});
            // collection adds a model, fires add event, then listener calls this.addView(model)
        },
        addView : function (newModel) {
            var item = this.$el.find("#item").val();
            var prior = this.$el.find("#priority").val();
            newModel.set("item", item);
            newModel.set("priority", prior);
            var currentDate = new Date(); 
            var dateTime = "Posted at: " + currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" + currentDate.getFullYear() + " @ " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            newModel.set("time", dateTime);
            var view = new ItemView({model : newModel});
            view.render();
            this.$("#todo-list").append(view.$el);
        }
    });

    var itemCollection = new ItemCollection();

    var itemCollectionView = new ItemCollectionView({ collection : itemCollection});

    itemCollectionView.render();

    $("#maindiv").append(itemCollectionView.$el);

});

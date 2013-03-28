
// Add uncaught-exception handler in prod-like environments
if (nails.config.environment != 'development') {
  process.addListener('uncaughtException', function (err) {
    nails.log.error(JSON.stringify(err));
  });
}

// Create a box
var box = nails.model.Box.create({id: '1qa'});
box.save(function(){
  // Create a thing
  var thing = nails.model.Thing.create({id: '2ws', boxid: '1qa', widgetid: '3ed'});
  thing.save(function(){
    // Create a widget
    var widget = nails.model.Widget.create({id: '3ed'});
    widget.save(function(){
      // Create a widget
      var widget = nails.model.Widget.create({id: '3ed'});
      widget.save(function(){
        // Get the box's things
        box.things(function(err, things) {
          console.log("box has " + things.length + " things");
          // Get the thing's box
          thing.box(function(err, box) {
            console.log("thing's box:", box.id);
            // Get the widget's thing
            widget.thing(function(err, thing) {
              console.log("widget's thing:", thing.id);
            });
          });
        });
      });
   });
  });
});

/*
  The topic object used to represent topics loaded into the system
*/
var TopicList = function () {
  this.count = 0;
  this.selected = [];
  this.colors = [
    "#d0011b", //red
    "#f6a623", //orange
    "#8b572a", //brown
    "#4990e2", //blue
    "#bd0fe1", //violet
    "#f33dd3", //pink
    "#417505", //green
    "#9012fe", //purple
    "#7ed321", //light-green
    "#50e3c2"  //teal?
  ];
  this.defaultColor = "#d8d8d8";
  this.averageColor = "#000000";
}
TopicList.prototype.getSelected = function() {
  return this.selected;
};

TopicList.prototype.getColor = function(k) {
  var k = parseInt(k);
  var i = this.getSelected().indexOf(k);
  if (k == -1 || i == -1) {
    return this.averageColor;
  }
  return this.colors[i]
};
TopicList.prototype.add = function(k) {
  k = parseInt(k);
  if (this.contains(k)) {
    return;
  }
  if (this.count == 10){
    return;
  }
  if (this.count < this.getSelected().length){
    for (i = 0; i < this.getSelected().length; i++) {
      if (this.getSelected()[i] == undefined) {
        this.getSelected()[i] = k;
        break;
      }
    }
  } else {
    this.getSelected().push(k);
  }
  this.count++;
};

TopicList.prototype.addAll = function (keys) {
  for (var i = 0; i < keys.length; i++) {
    this.add(parseInt(keys[i]));
  }
};

TopicList.prototype.full = function() {
  return this.count == 10;
};

TopicList.prototype.contains = function(k) {
  k = parseInt(k);
  return this.getSelected().indexOf(k) != -1;
}

  //works for both topTen and selected
TopicList.prototype.addOrGet = function(k) {
  k = parseInt(k);
  var tempCol = this.add(k);
  if (tempCol == undefined) {
    return this.getColor(k)
  }
  return tempCol;
};

TopicList.prototype.deleteSelected = function(k) {
  k = parseInt(k);
  i = this.getSelected().indexOf(k);
  if (i > -1) {
      this.getSelected()[i] = undefined;
      this.count--;
  }
};

TopicList.prototype.nextColor = function() {
  var ind = 0;
  if (this.count < this.getSelected().length){
    for (i = 0; i < this.getSelected().length; i++) {
      if (this.getSelected()[i] == undefined) {
        ind = i;
        break;
      }
    }
  } else {
    ind = this.count;
  }
  return this.colors[ind];
};

TopicList.prototype.clear = function() {
  this.count = 0;
  this.selected = [];
}

// gets all topics in selection as objects, not just keys.
// tRef is the list of objects to be used to translate the key into the object
TopicList.prototype.getSelectedAsTopics = function(tRef) {
  var preSelected = [];
  for (var i = 0; i < this.getSelected().length; i++) {
    var tp = this.getSelected()[i];
    var t = tRef.find(function (t) { return tp == t.key });
    if (t != undefined) {
      preSelected.push(t);
    }
  }
  return preSelected;
}

//Return array of topics in form { key: <key>, color: "<hex value>"}
TopicList.prototype.getSelectedWithColor = function() {
  var topicsWithColors = [];
  var selected = this.getSelected();
  for (var i = 0; i < this.getSelected().length; i++) {
    var k = this.getSelected()[i]
    topicsWithColors.push({
      key: k,
      color: this.getColor(k) // this is an inefficient solution unfortunately
    });
  }
  return topicsWithColors;
}

TopicList.prototype.empty = function() {
  return this.count == 0;
}

TopicList.prototype.getKeys = function() {
  return this.getSelected().reduce(function (r, a) {
        if (a != undefined) {
            r.push(a);
        }
        return r;
    }, []);
}

TopicList.prototype.copyFrom = function(keys) {
  this.clear();
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] != undefined) {
      this.count++;
    }
    this.selected[i] = keys[i];
  }
}

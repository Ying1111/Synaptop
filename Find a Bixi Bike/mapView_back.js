var React = require('react');
var moment = require('moment');
var marked = require('marked');
//var App = require('./components/App');

var myArr = $.parseJSON('[{"lng":"-79.385865","lat":"43.642424","url":"http://www.ripleyaquariums.com/canada/","title":"Ripleys Aquarium","img":"aquarium.png"},{"lng":"-79.387057","lat":"43.642566","url":"http://www.cntower.ca/en-ca/home.html","title":"CN Tower","img":"cntower.jpg"},{"lng":"-79.18589","lat":"43.817699","url":"http://www.torontozoo.com/","title":"Toronto Zoo","img":"torontozoo.jpg"},{"lng":"-79.394777","lat":"43.66771","url":"http://www.rom.on.ca/en","title":"Royal Ontario Museum","img":"rom.jpg"},{"lng":"-79.392512","lat":"43.653607","url":"http://www.ago.net/","title":"Art Gallery of Ontario","img":"artgalleryontario.jpg"},{"lng":"-79.453206","lat":" 43.725887","url":"http://yorkdale.com/","title":"Yorkdale Mall","img":"yorkdalemall.jpg"},{"lng":"-79.381455","lat":"43.653597","url":"http://www.torontoeatoncentre.com/en/Pages/default.aspx","title":"Toronto Eaton Center","img":"torontoeatoncentre.jpg"},{"lng":"-79.38409","lat":" 43.65344","url":"http://www.toronto.ca/","title":"City Hall","img":"torontocityhall.jpg"},{"lng":"-79.377264","lat":"43.646988","url":"http://www.hhof.com/","title":"Hockey Hall of Fame","img":"hh.jpeg"},{"lng":"-79.379099","lat":"43.643466","url":"http://www.theaircanadacentre.com/","title":"Air Canada Center","img":"ac.jpeg"}]');
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox" >heyheyhey</div>
    );
  }
});

var Map = React.createClass({

	componentDidMount(){

		this.updateMaps();
	},
	updateMaps(){
		var map = new GMaps({
			div: '#map',
			zoom :12,
			lat: '43.653607',
			lng: '-79.392512'
		});
		for (i = 0; i < myArr.length; i++) {
			//alert(myArr[i]["url"]);
			map.addMarker({
				lat: myArr[i]["lat"],
				lng: myArr[i]["lng"]
			});


		}
	},	listInsert(){
		var total='';
		for (i = 0; i < myArr.length; i++) {

			total = total+'<li><a target="_blank" href="'+myArr[i]['url']+'">'+ myArr[i]['title']+'</a><img src="images/'+ myArr[i]['img']+'"></li>';
		}
		//return total;
		return { __html: total };
	},
	render(){
		return (
			<div className="mapshow">
				<div className="section" id="section">List</div>
				<div id="map" />
				<ul id="list" dangerouslySetInnerHTML={this.listInsert()} />
			</div>
		);
	}

});



React.render(

  <Map />,
  document.getElementById('mapSection')
);

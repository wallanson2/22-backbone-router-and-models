
// ================================================
var appContainer = document.querySelector('#app-container')
var contentArea = document.querySelector('.content-area')



//===========================================================
  // var HomeView = Backbone.View.extend({
  //  //
  //  el: '.content-area',
  //
  //   //  events : {
  //   //     'click .picTriggers' : 'showCountry'
  //   //     },
  //     showCountry: function(subcategory){
  //       contentArea.innerHTML = "<h1 class='bg-info'>"+ BookPics +"</h1>"
  //
  //       var modlInstance = new CountryModel(countryName)
  //       modlInstance.fetch().then(function(){
  //          var theCapital = modlInstance.get('capital')
  //
  //
  //          // console.log(modlInstance)
  //       }),
  //     }
  //   }),
//=================================================

var BookModel = Backbone.Model.extend({
   url: "",
   parse: function(parsedRes){
    //  console.log(parsedRes)
     return parsedRes.volumeInfo
   },

})
var BookCollections = Backbone.Collection.extend({
  model: BookModel,
  url:"",

  parse: function(parsedResCol){
    // console.log(parsedResCol)
    return parsedResCol.items
  },
  initialize: function(cVal){

     // (2) configuring url dynamically
     this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + cVal
    //  console.log('hey')
  },

})



var AppRouter = Backbone.Router.extend({

   routes: {
      "books/:categories/:subcategory" : "showSubCategory",
      "books/:categories" : "showGeneralCategory",
      "*path" : "showHomePage"

   },

   showSubCategory: function(placeholder, categories){
     var bookcollectionsInstance = new BookCollections(categories)
      bookcollectionsInstance.fetch().then(function(serverRes){
        // category = categories.toUpperCase()
        var subPictureStr = ''
          subPictureStr += '<h1 class="bookClass">' + categories.toUpperCase() + '</h1>'
        bookcollectionsInstance.models.forEach(function(modelData){
          subPictureStr += '<div class="col-xs-4 col-sm-3 columnsCont">'
          var bookLink = modelData.get('imageLinks')
          if(bookLink === undefined){
            var bookImage = 'images/file-not-found.png'
          }else{
            var bookImage = modelData.attributes.imageLinks.thumbnail
          }
          subPictureStr += '<img class="bookImg" src="' + bookImage + '"/>'
          subPictureStr += '<p class="bookTitle">' + modelData.attributes.title + '</p>'
          subPictureStr += '</div>'

        })
        contentArea.innerHTML = subPictureStr
      })
    },

   showGeneralCategory: function(categories){
     var bookcollectionsInstance = new BookCollections(categories)
      bookcollectionsInstance.fetch().then(function(serverRes){
        var bigPictureStr = ''
          bigPictureStr += '<h1 class="bookClass">' + categories + '</h1>'
        bookcollectionsInstance.models.forEach(function(modelData){          // bigPictureStr += '<div class="col-sm-4">'
          bigPictureStr += '<div class="col-xs-4 col-sm-3 columnsCont">'

          var bookLink = modelData.get('imageLinks')
          if(typeof bookLink === 'undefined'){
            var bookImage = 'images/file-not-found.png'
          }else{
            var bookImage = modelData.attributes.imageLinks.thumbnail
          }
          bigPictureStr += '<img class="bookImg" src="' + bookImage + '"/>'
          bigPictureStr += '<p class="bookTitle">' + modelData.attributes.title + '</p>'
          bigPictureStr += '</div>'
        })
          contentArea.innerHTML = bigPictureStr
      })
   },

   showHomePage: function(){
      console.log('routing to home')
      var categoryListings = [
         {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
         {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
         {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] }
      ]
          bigStr = ''

          for(var j = 0; j < categoryListings.length; j += 1){
            bigStr += '<div class="col-sm-4">'
            bigStr +=   '<h2><a href="#/books/'+ categoryListings[j].catName +'">' + categoryListings[j].catName + '</a></h2>'
            bigStr +=   '<ol>'

            for(var i = 0; i < categoryListings[j].subcatList.length; i += 1){                //   console.log(routeArr.length)
                bigStr += '<li class="picTriggers"><a href="#/books/'+ categoryListings[j].catName.toLowerCase() + '/' +categoryListings[j].subcatList[i].toLowerCase() +'">' +  categoryListings[j].subcatList[i] + '</a></li>'

            }
            bigStr += '</ol>'
            bigStr += '</div>'
          }
          contentArea.innerHTML = bigStr
          // contentArea.innerHTML = url="http://books.google.com/books/content?id=irUACwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
    },




   initialize: function(){
      // console.log('backbone ROUTING')
      Backbone.history.start()
   },
})
// window.addEventListener('hashchange', HomeView)
var app = new AppRouter()
//=======================================

// $.getJSON("https:www.googleapis.com/books/v1/volumes?q=subject:fiction").then(function(resultsArray){
//    // YOUR WORK HERE
//    var tranformedArrayCopy = resultsArray.map( function( singleEl ){ return   } )
//    console.log(tranformedArrayCopy)
//    var namesArray = resultsArray.map(function(arrayEl, index, arr){
//       return arrayEl.category
//    })
//
// })

// $.getJSON("https:www.googleapis.com/books/v1/volumes?q=subject:fiction").then(function(resultsArray2){
//    // YOUR WORK HERE
//    var filteredListArr = resultsArray2.filter(function(arrayEl, index, arr){
//       if( arrayEl.region === 'Asia'){
//          return true
//       } /*optional */else {
//          return false
//       }
//    })
//
// })

// console.log('what up', bookcollectionsInstance)
//  var viewPicPageInstance = new viewPicPage()
//  //(2) Passing data to a view's render function
//  //    ( see notes on bb-views-intermediate.js )
//  viewPicPageInstance.render(bookcollectionsInstance)

// var viewPicPage = Backbone.View.extend({
//  el : '.content-area',

// _buildHtmlPicTemplate: function(){
  // var bigPictureStr = ''
  //   bigPictureStr += '<div class="col-sm-4">'
  //   bigPictureStr +=    '<h1>Help Me!!</h1>'
  //   bigPictureStr +=
  //   bigPictureStr += '</div>'

    // return bigPictureStr
  // },
  // render: function(mod){
  //   // console.log(this._buildHTMLTemplate() )
  //   console.log(mod)
  //   console.log(this)
  //   this.el.innerHTML = bigPictureStr
  //   return this
  // }
  // contentArea.innerHTML = bigPictureStr
// })

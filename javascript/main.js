window.onload = function () {


   ///// Choose Item color 

   $('.item-color:first-child').addClass( 'selected' );
   
   $('.item-color').click(function() {

      $('.item-color').removeClass( 'selected' );
      $(this)         .addClass( 'selected' );

      $('.item-color > input').val( '' )     .removeClass( 'selected' );
      $(this).find('input')   .val( this.id ).addClass( 'selected' ); 

   });


   ///// Adding Item to Card

   $('#add-to-card').click(function(event) {

      var formData = {
         'color'      : $('input.selected').val(),
         'size'       : $('select.size option:selected').val(),
         'quantity'   : $('select.quantity option:selected').val(),
         'id'         : $('input#item-id').val()
      }; 

      //if (ifValidated()) {
      
         $('form').submit(function(event) { 

            $.ajax({
               type       : 'POST', 
               url        : '/', 
               data       :  formData, 
               dataType   : 'json', 
               encode     :  true
            })

            .done(function(data) {
                
                console.log(data);                 
                // handle errors and validation messages
            });

            setCookie(formData);
            
            event.preventDefault();

            alert(document.cookie);
            
         });
      //}
   });

   function ifValidated() {     
      // availableItems = {}

      // if (!(itemData).match(availableItems)) {
      //    alert("Sorry, this color is currently unavaible...");
      //    return false; } 
      // else {
      //    return true;
      // }
   };

   function setCookie( data ) {
      var expires = new Date();
      
      expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));

      document.cookie = 'cookieObject=' + JSON.stringify(data) + ';expires=' + expires.toUTCString();
   }

   function getCookie( key ) {
      var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      
      return keyValue ? keyValue[2] : null;
      //if keyValue == true >>> return keyValue
      //if keyValue == false >>> return keyValue[2]
      // ':'' (otherwise) >>> return null
   }


   ///// ReadMore logic

   $(document).ready(function() {

      function loadItemCharacteristics() {
         
         $.ajax({   
            type:     "GET",
            url:      "/ecommerce/resources/littledb.json", //pseudo database            
            dataType: "json",    

            success: function( data ) {                    
               //console.log(data);
               var itemCharacteristics = data.items.item[0].characteristics
               
               //console.log(itemCharacteristics);

               $.each( itemCharacteristics, function( value ) {
                  
                  var showList = $('.dropdown-menu');
                  
                  var li = $('<li/>')
                      .text( itemCharacteristics[ value ] )
                      .addClass( 'menu-item' )
                      .hide()
                      .prependTo( showList )
                      .fadeIn(500);  
               }); 
            }

         });
      }

      $('.read-more').one('click', function( e ) {

         $(this).removeClass( 'visible' );
         
         loadItemCharacteristics();

         e.preventDefault();

      });

      var windowSize = $(window).width();

      if ( windowSize >= 1024 || windowSize <= 768 ) {

         $('.dropdown-menu').addClass( 'showed' );

         loadItemCharacteristics(); 
      }

   });


   ///// Images Slider

   var sliderfunc = function() {
   
      $('.arrow-next').click(function() {
         
         var currentSlide = $('.active-slide');
         var nextSlide    = currentSlide.next();

         if(nextSlide.length === 0) {
            nextSlide = $('.slide').first();
         }
         
         currentSlide.fadeOut(600).removeClass('active-slide');
         nextSlide.   fadeIn(600) .addClass('active-slide');
      });


      $('.arrow-prev').click(function() {
         
         var currentSlide = $('.active-slide');
         var prevSlide    = currentSlide.prev();

         if(prevSlide.length === 0) {
            prevSlide = $('.slide').last();
         }
           
         currentSlide.fadeOut(600).removeClass('active-slide');
         prevSlide   .fadeIn(600) .addClass('active-slide');
      }); 
   }

   $(document).ready(sliderfunc);

};
window.onload = function(e) {
    let toggle_price = document.getElementById('toggle-price');
    toggle_price.addEventListener('click', function(e) {
      console.log('toggle_price clicked');
      
    });
  
    let toggle_unlockable = document.getElementById('toggle-unlockable');
    toggle_unlockable.addEventListener('click', function(e) {
      console.log('toggle_unlockable clicked');
  
      let bShow = toggle_unlockable.classList.contains('active');
      let display = bShow == true ?  'block' : 'none';
      document.getElementById('unlockable').style.display = display;
    });
  
    let toggle_utility = document.getElementById('toggle-utility');
    toggle_utility.addEventListener('click', function(e) {
      console.log('toggle_utility clicked');
  
      let bShow = toggle_utility.classList.contains('active');
      let display = bShow == true ? 'block' : 'none';
      document.getElementById('utility').style.display = display;
  
      display = bShow == true ? 'inline' : 'none';
      document.getElementById('comingsoon').style.display = display
    });
  
  
    let input, container;
    input = document.querySelector('#hashtags');
    container = document.querySelector('.tag-container');
    hashtagArray = [];
  
    input.addEventListener('keyup', () => {
        if (event.which == 13 && input.value.length > 0) {
          var text = document.createTextNode(input.value);
          var p = document.createElement('p');
          container.appendChild(p);
          p.appendChild(text);
          p.classList.add('tag');
          input.value = '';
          
          let deleteTags = document.querySelectorAll('.tag');
          for(let i = 0; i < deleteTags.length; i++) {
            deleteTags[i].addEventListener('click', () => {
              container.removeChild(deleteTags[i]);
            });
          }
        }
    });

    const INFERNA_SERVER_URL = 'http://localhost:3000';
    // var callRestAPI = function() {
    //     $.ajax({
    //         url: `${INFERNA_SERVER_URL}/api/v1/backend/fetchImage`,
    //         type: "POST",
    //         data: {url: 'https://infernaco.com/demo/img/cover/10.jpg'},
    //         // data: {url: 'http://localhost:3000/sample/bill.jpg'},
    //         dataType: 'json',
    //         success: function(response) {
    //            console.log(response);
    //         }
    //     });
    // }
    // callRestAPI();

    /**
     * upload the image
     * get the filestream on the local, opening the file-upload window
     * call the server
     *      api: /api/v1/backend/uploadImage, 
     *      method: post
     *      param: filestream
     *      return: list of reverse image search
     */
    $('#upload-image-button').click( (e) => {
        e.preventDefault()

        // open the file input window
        $('#upload-file-input').change( function(e){ 
            let file = $(this)[0].files[0]
            let reader = new FileReader()
            let blob = null, fileName = '';
            reader.readAsDataURL(file)
            reader.onloadend = function() {
                blob = reader.result
                fileName = file.name
                uploadImage(fileName, blob)
            }
        })
        .trigger('click')
        
        var uploadImage = function(fileName, blobFile) {                    
          $.ajax({
              url: `${INFERNA_SERVER_URL}/api/v1/backend/uploadImage`,
              type: "POST",
              data: {fileName: fileName, blob: blobFile},
              dataType: 'json',
              success: function(response) {
                  console.log(response);
                  
                  let thumbnail = response.thumbnail;
                  let list = response.list 

                  // show the thumbnail //                  
                  $('#image-previewer')[0].src = thumbnail;

                  // show the reverse list //
                  let count = list.length ? list.length - 1: 0;
                  $('#search-image-count').text(count);
                  $('.search-list-box ul').children().remove();
                  list.map((each, index) => {
                    // first element represents the title, so it is not neceessary to display.
                    if( index > 0 ) {
                      const list = `<li><a target="_blank" rel="noopener noreferrer" href=${each.url}>${each.title}</a></li>`;
                      $('.search-list-box ul').append(list);
                    }                      
                  })
              },
              error: function(jqXHR, textStatus, errorMessage) {
                  console.log(textStatus);
              }
          });
        }
    })

    /**
     * fetch the watermarked image
     * as click the thumbnaii, fetch the watermarked image, open the canvas view and project the mouse right button and 
     * call the server
     *      api: /api/v1/backend/fetchWatermark, 
     *      method: post
     *      param: thumbnail url
     *      return: blob file stream
     */
    $('#image-previewer').click( (e) => {
      e.preventDefault();
      const src = $('#image-previewer').attr('src');
      const watermark = '0x95e863cbc95057351d84302372056eEB07856c56';
      
      $.ajax({
        url: `${INFERNA_SERVER_URL}/api/v1/backend/fetchWatermark`,
        type: "POST",
        data: {payload: {watermark: watermark, fileName: src}},
        dataType: 'json',
        success: function(response) {
            console.log(response);
            let canvas = document.getElementById('watermark-preview-canvas');
            let img = new Image;
            let ctx = canvas.getContext('2d');
            let blob = response.payload.blob;
            console.log(blob)

            img.onload = function () {
              // canvas.width = img.width 
              // canvas.height = img.height
              // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              canvas.width = img.width
              canvas.height = img.height 

              // Draw image to the canvas
              ctx.drawImage(img, 0, 0) 
            }
            // img.src = blob;
        },
        error: function(jqXHR, textStatus, errorMessage) {
            console.log(textStatus);
        }
      });

    })
  
  }
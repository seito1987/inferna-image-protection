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
    var callRestAPI = function() {
        $.ajax({
            url: `${INFERNA_SERVER_URL}/api/v1/backend/fetchImage`,
            type: "POST",
            // data: {url: 'https://infernaco.com/demo/img/cover/10.jpg'},
            data: {url: 'http://localhost:3000/sample/bill.jpg'},
            dataType: 'json',
            success: function(response) {
               console.log(response);
            }
        });
    }
    callRestAPI();

    /**
     * upload the image
     * get the filestream on the local, opening the file-upload window
     * call the server
     *      api: /upload/image, 
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
            let blob = null
            reader.readAsDataURL(file)
            reader.onloadend = function() {
                blob = reader.result
                console.log(blob)
                uploadImage(blob)
            }
        })
        .trigger('click')
        
        var uploadImage = function(blobFile) {          
          var canvas = document.getElementById('watermark-preview-canvas');
          var img = new Image;
          var ctx = canvas.getContext('2d');
          img.onload = function () {
            // canvas.width = img.width 
            // canvas.height = img.height
            // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.width = img.height 
            canvas.height = img.height 

            // Draw image to the canvas
            ctx.drawImage(img, 0, 0) 
          }
          img.src = blobFile;
          return;

          $.ajax({
              url: `${INFERNA_SERVER_URL}/uploadImage`,
              type: "POST",
              data: blobFile,
              dataType: 'json',
              success: function(response) {
                  console.log(response);
                  // let thumbnail_url = response.thumbnail;
                  // let reverse_list = response.reverselist 

                  // // show the thumbnail //
                  // $('#image-previewer')[0].src = thumbnail_url;

                  // // show the reverse list //
                  // let count = reverse_list.length ? reverse_list.length : 0;
                  // $('#search-image-count').text(count);
                  // $('.search-list-box ul').children().remove();
                  // reverse_list.map((each) => {
                  //     const list = `<li><a href=${each.url}>${each.title}</a></li>`;
                  //     $('.search-list-box ul').append(list);
                  // })
              },
              error: function(jqXHR, textStatus, errorMessage) {
                  // console.log(errorMessage);
              }
          });
        }
    })
  
  }
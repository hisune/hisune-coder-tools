const storage = require('electron-json-storage'),
    os = require('os'),
    shell = require('electron').shell,
    ipc = require('electron').ipcRenderer;

$(document).ready(function(){
  ipc.send('document-is-ready');
});

$('.open-item').click(function(){
  if(os.platform() == 'win32'){
    shell.openItem($(this).data('win'))
  }else{
    shell.openItem($(this).data('mac'))
  }
});

let ws = $('#window-search');
ws.on('change', function(){
  if($(this).val() == ''){
    ipc.send('search-done', '');
    ws.hide();
  }
});
$("#window-search-btn").click(function(){
  if(ws.is(':visible')){
    let val = ws.val();
    if(val)
      ipc.send('search-action', val);
    else{
      ipc.send('search-done', '');
      ws.hide();
    }
  }else{
    ws.show().focus();
  }
});

// Default to the view that was active the last time the app was open
storage.get('activeSectionButtonId', function (err, id) {
  if (err) return console.error(err)

  if (id && id.length) {
    showMainContent()
    const section = document.getElementById(id)
    if (section) section.click()
  } else {
    activateDefaultSection()
    displayAbout()
  }
})

document.body.addEventListener('click', function (event) {
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  } else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains('modal-hide')) {
    hideAllModals()
  }
})

function handleSectionTrigger (event) {
  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
  event.target.classList.add('is-selected')

  // Display the current section
  const sectionId = event.target.dataset.section + '-section'
  document.getElementById(sectionId).classList.add('is-shown')

  // Save currently active button in localStorage
  const buttonId = event.target.getAttribute('id')
  storage.set('activeSectionButtonId', buttonId, function (err) {
    if (err) return console.error(err)
  })
}

function activateDefaultSection () {
  document.getElementById('button-shadowsocks').click()
}

function showMainContent () {
  document.querySelector('.js-nav').classList.add('is-shown')
  document.querySelector('.js-content').classList.add('is-shown')
}

function handleModalTrigger (event) {
  hideAllModals()
  const modalId = event.target.dataset.modal + '-modal'
  document.getElementById(modalId).classList.add('is-shown')
}

function hideAllModals () {
  const modals = document.querySelectorAll('.modal.is-shown')
  Array.prototype.forEach.call(modals, function (modal) {
    modal.classList.remove('is-shown')
  })
  showMainContent()
}

function hideAllSectionsAndDeselectButtons () {
  const sections = document.querySelectorAll('.js-section.is-shown')
  Array.prototype.forEach.call(sections, function (section) {
    section.classList.remove('is-shown')
  })

  const buttons = document.querySelectorAll('.nav-button.is-selected')
  Array.prototype.forEach.call(buttons, function (button) {
    button.classList.remove('is-selected')
  })
}

function displayAbout () {
  document.querySelector('#about-modal').classList.add('is-shown')
}

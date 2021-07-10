const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)


const App = {
  init() {
    this.$codePre = $('#code pre')
    this.$button = $('.button')
    this.$modal = $('#modal')
    this.$popupGranted = $('.popup-granted')
    this.$popupDenied = $('.popup-denied')
    this.text = ''
    this.cursor = 0
    this.canEdit = false

    this.bind()
    this.fetchData()
  },
  bind() {
    this.$button.onclick = () => {
      this.hide(this.$modal)
      this.canEdit = true
      this.$codePre.classList.add('editable')
    }

    document.onkeypress = e =>{
      if(e.key === '0'){
        this.show(this.$popupGranted)
        this.canEdit = false
      }else if(e.key === '1'){
        this.show(this.$popupDenied)
        this.canEdit = false
      }else if(e.key === '2'){
        this.hide(this.$popupDenied)
        this.hide(this.$popupGranted)
        this.hide(this.$modal)
        this.canEdit = true
      }else if(e.key === 'h'){
        this.show(this.$modal)
        this.canEdit = false
      }else if(this.canEdit){
        this.$codePre.innerText = this.text.substr(0, this.cursor)
        this.cursor += 10
      }
    }
  },
  show($node) {
    $node.classList.add('show')
  },
  hide($node) {
    $node.classList.remove('show')
  },
  fetchData() {
    fetch('https://raw.githubusercontent.com/deptofdefense/scan-alb-logs/main/scripts/scan-alb-logs')
      .then(res => res.text())
      .then(res => {
        this.text = res
        this.show(this.$modal)
      })
  }


}
App.init()
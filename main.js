var app = new Vue({
  el: '#app',
  data: {
    inputStr: '',
    replaceList: [],
    before: '',
    after: ''
  },
  created: function () {
    // 画面表示時に置換リストを取得しておく
    this.getList()
  },
  computed: {
    /**
     * 入力テキストを置換したものを出力する
     */
    outputStr: function() {
      var tmpStr = escapeHTML(this.inputStr)
      if (tmpStr.length == 0) {
        return '左のテキストエリアへ文字列を入力してください'
      }
      tmpStr = tmpStr.split(' ').join('&nbsp;');
      for (var i = 0; i < this.replaceList.length; i++) {
        var data = this.replaceList[i]
        tmpStr = tmpStr.split(data.before).join('<replaced>' + data.after + '</replaced>');
      }
      tmpStr = tmpStr.replace(/\r?\n/g, '<br/>')
      tmpStr = tmpStr.split(' ').join('&nbsp;')
      tmpStr = tmpStr.split('<replaced>').join('<span class="replaced">')
      tmpStr = tmpStr.split('</replaced>').join('</span>')
      return tmpStr
    }
  },
  methods: {
    /**
     * 置換対象の文字列一覧を取得する(API通信)
     */
    getList: function (event) {
      var pathname = location.pathname.replace('index.html', '')
      pathname += 'api/getList.php'

      axios.post(pathname)
        .then(function (res) {
          this.replaceList = res.data
        }.bind(this))
        .catch(function (res) {
          console.log('Ajax Error Occured')
          console.log(res)
        }.bind(this))
    },
    /**
     * 置換対象の文字列を登録する(API通信)
     */
    repRegist: function () {
      var params = new URLSearchParams()
      params.append('before', this.before)
      params.append('after', this.after)
      var pathname = location.pathname.replace('index.html', '')
      pathname += 'api/regist.php'

      axios.post(pathname, params)
        .then(function (res) {
          this.before = ''
          this.after = ''
          this.getList()
        }.bind(this))
        .catch(function (res) {
          console.log('Ajax Error Occured')
          console.log(res)
        }.bind(this))
    },
    /**
     * 置換対象の文字列を削除する(API通信)
     */
    repDelete: function (id) {
      if (window.confirm('削除しても宜しいですか？')) {
        var params = new URLSearchParams()
        params.append('id', id)
        var pathname = location.pathname.replace('index.html', '')
        pathname += 'api/delete.php'

        axios.post(pathname, params)
          .then(function (res) {
            this.getList()
          }.bind(this))
          .catch(function (res) {
            console.log('Ajax Error Occured')
            console.log(res)
          }.bind(this))
      }
    },
    /**
     * 置換後の文字列クリップボードにコピーする
     */
    copyAfter: function () {
      var elm = document.getElementById('copyArea')
      elm.style.display="block";
      var tmpStr = document.getElementById('afterStr').innerText
      tmpStr = tmpStr.split(' ').join(' '); // &nbsp;を普通のスペースに変換している
      elm.value = tmpStr
      elm.select()
      document.execCommand("copy")
      elm.style.display="none";
    }
  }
})

/**
 * 文字列のHTMLタグをエスケープする
 */
function escapeHTML(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

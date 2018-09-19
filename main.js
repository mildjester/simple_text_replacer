var app = new Vue({
  el: '#app',
  data: {
    inputStr: '',
    outputStr: '左のテキストエリアへ文字列を入力してください',
    replaceList: [],
    before: '',
    after: ''
  },
  methods: {
    /**
     * 文字列の置換を実行する
     */
    doReplace: function (event) {
      this.outputStr = this.inputStr
      for (var i = 0; i < this.replaceList.length; i++) {
        var data = this.replaceList[i]
        this.outputStr = this.outputStr.replace(data.before, data.after)
      }
    },
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
      document.getElementById('afterStr').select()
      document.execCommand("copy")
    }
  }
})
app.getList()

components.container = (function(http, router) {
  return {
    template: `
            <div class="container-fluid">
                <div class="header">
                    Family.
                </div>
            </div>
        `,
    initialize: function() {
      http.get('/valid').then(data => {
        if (!data.valid) {

        }
      })
    }
  }
})();
import './App.css';

function App() {
  return (
    <div class="container p-3">
        <div id="msg-container">

        </div>
        <form action="" id="form-container" method="post">
            <div class="form-row">
                <div class="input-group">
                    <input type="text" id="msg" class="form-control"/>
                    <div class="input-group-append">
                        <button type="submit" id="send" class="btn btn-primary">Send</button>
                    </div>
                </div>
            </div>
        </form>

    </div>
  );
}

export default App;

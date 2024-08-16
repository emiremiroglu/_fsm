import PocketBase from 'pocketbase';
const pb = new PocketBase('http://pocketbase.rmtx.dev');

pb.collection('conversion_trackers').subscribe('*', function (e) {
  console.log(e.action);
  console.log(e.record);
})
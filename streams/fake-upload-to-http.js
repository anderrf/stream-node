import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToTenStream extends Readable{
    index = 1;
    _read(){
        const i = this.index++;
        if(i > 10){
            this.push(null);
        }
        else{
            const buf = Buffer.from(String(i));
            this.push(buf);
        }
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())*10);
        callback();
    }
}



fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToTenStream(),
    duplex: 'half'
}).then(response => {
    return response.text();
}).then(data => {
    console.log(data);
});
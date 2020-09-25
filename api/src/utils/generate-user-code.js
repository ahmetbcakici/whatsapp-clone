import randomstring from 'randomstring';

export default _ => randomstring.generate({ length: 4, charset: 'numeric' })
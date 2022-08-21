import { Component, OnInit } from '@angular/core';

var id = 99;
interface IUser {
  id: string;
  name: { firstname: string; lastname: string };
  birthdate: string;
  email: string;
  phone: string;
  address: string;

  setName(firstname: string, lastname: string): void;
  getName(): string;
  setBirthdate(birthdate: string): void;
  getBirthdate(): string;
  setEmail(email: string): void;
  getEmail(): string;
  setPhone(phone: string): void;
  getPhone(): string;
  setAddress(address: string): void;
  getAddress(): string;
}
class User implements IUser {
  static id_gen: number = 99;
  id: string = '';
  name: { firstname: string; lastname: string } = {
    firstname: '',
    lastname: '',
  };
  birthdate: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  constructor(firstname: string, lastname: string) {
    this.name.firstname = firstname;
    this.name.lastname = lastname;
  }
  setName(firstname: string, lastname: string): void {
    this.name.firstname = firstname;
    this.name.lastname = lastname;
  }
  getName(): string {
    return this.name.firstname + ' ' + this.name.lastname;
  }
  setBirthdate(birthdate: string): void {
    this.birthdate = birthdate;
  }
  getBirthdate(): string {
    return this.birthdate;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  getEmail(): string {
    return this.email;
  }
  setPhone(phone: string): void {
    this.phone = phone;
  }
  getPhone(): string {
    return this.phone;
  }
  setAddress(address: string): void {
    this.address = address;
  }
  getAddress(): string {
    return this.address;
  }
  generateId(): string {
    id++;
    return String(id);
  }
}
class UsersOperations {
  localUsers: User[] = [];
  constructor() {
    this.fill();
  }

  fill(): void {
    var user = new User('abdallah', 'shnaino');
    user.id = user.generateId();
    user.setBirthdate('06/03/2000');
    user.setAddress('GAZA');
    user.setEmail('abdallah.shnaino@gmail.com');
    user.setPhone('00972598338985');

    var user2 = new User('mohammed', 'shnaino');
    user2.id = user2.generateId();
    user2.setBirthdate('06/05/2000');
    user2.setAddress('RAFAH');
    user2.setEmail('mohammed.shnaino@gmail.com');
    user2.setPhone('00972598465954');

    this.localUsers.push(user);
    this.localUsers.push(user2);
  }

  createUser(user: User): boolean {
    var newUser = new User(user.name.firstname, user.name.lastname);
    newUser.id = newUser.generateId();
    newUser.setBirthdate(user.birthdate);
    newUser.setAddress(user.address);
    newUser.setEmail(user.email);
    newUser.setPhone(user.phone);
    var lastNum = this.localUsers.length + 1;
    this.localUsers.push(newUser);
    if (lastNum == this.localUsers.length) {
      return true;
    }
    return false;
  }
  updateUser(id: number, user: User): boolean {
    for (let userCurser of this.localUsers) {
      if (Number(userCurser.id) === id) {
        userCurser.setName(user.name.firstname, user.name.lastname);
        userCurser.setEmail(user.email);
        userCurser.setAddress(user.address);
        userCurser.setBirthdate(user.birthdate);
        userCurser.setPhone(user.phone);
        return true;
      }
    }
    return false;
  }

  deleteUser(id: string): boolean {
    for (let i = 0; i < this.localUsers.length; i++) {
      if (Number(this.localUsers[i].id) === Number(id)) {
        this.localUsers.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  usersList!: User[];
  op: UsersOperations = new UsersOperations();
  // operations switches vars
  formVisabilityStatus!: boolean;
  alertVisabilityStatus!: boolean;
  isUpdateOperation!: boolean;

  // binded User
  user!: User;
  constructor() {}
  ngOnInit(): void {
    this.user = new User('', '');
    this.formVisabilityStatus = false;
    this.alertVisabilityStatus = false;
    this.isUpdateOperation = false;
    this.usersList = this.op.localUsers;
  }
  passUserId(id: string): void {
    this.user = new User('', '');
    this.onUpdateUserEvent(id)
    this.isUpdateOperation = true;
    this.showForm();
    this.user.id = id;
  }
  onUpdateUserEvent(id:string):void{
    var onUpdateUser = this.op.localUsers.find( user => user.id == id)!
    this.user.setName(onUpdateUser.name.firstname, onUpdateUser.name.lastname);
    this.user.setEmail(onUpdateUser.email);
    this.user.setAddress(onUpdateUser.address);
    this.user.setBirthdate(onUpdateUser.birthdate);
    this.user.setPhone(onUpdateUser.phone);
    console.log(onUpdateUser)
  }
  deleteUser(id: string): void {
    var res = this.op.deleteUser(id);
  }

  updateUser(): void {
    var id = Number(this.user.id);
    this.op.updateUser(id, this.user);
    this.closeForm();
    this.changeAlertVisabilityStatus();
  }

  addUser(): void {
    this.isUpdateOperation = false;
    var result: boolean = this.op.createUser(this.user);
    if (result == true) {
      this.user = new User('', '');
      this.closeForm();
      this.changeAlertVisabilityStatus();
    }
  }

  showForm(): void {
    this.formVisabilityStatus == false;
    if (this.formVisabilityStatus == false) {
      this.formVisabilityStatus = true;
    }
  }
  closeForm(): void {
    this.formVisabilityStatus = false;
    this.isUpdateOperation = false;
  }

  changeAlertVisabilityStatus(): void {
    this.alertVisabilityStatus = true;
    setTimeout(() => {
      this.alertVisabilityStatus = false;
    }, 2000);
  }
}

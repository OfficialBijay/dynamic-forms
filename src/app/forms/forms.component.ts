import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  formElements: { elementType: string; content: string }[] = [];
  generatedHTML: string = ``;

  textVariable: string = "Enter Your Text";
  currentIndex: number = 0;

  showHeadingTextEditor: boolean = false;
  showLabelTextEditor: boolean = false;
  showTextInputTextEditor: boolean = false;
  showEmailInputTextEditor: boolean = false;
  showNumberInputTextEditor: boolean = false;
  showPwdInputTextEditor: boolean = false;
  showRadioButtonTextEditor: boolean = false;
  showCheckBoxTextEditor: boolean = false;
  showDropDownOptionTextEditor: boolean = false;
  showSubmitButtonTextEditor: boolean = false;



  constructor(private clipboardService: ClipboardService) { }

  selectElement(elementName: string) {
    this.closeAllCustomTextEditors();
    switch (elementName) {
      case 'heading':
        this.formElements.push({ elementType: elementName, content: 'Text Heading' });
        break;
      case 'label':
        this.formElements.push({ elementType: elementName, content: 'Text Label' });
        break;
      case 'text-input':
        this.formElements.push({ elementType: elementName, content: 'Text Input' });
        break;
      case 'email-input':
        this.formElements.push({ elementType: elementName, content: 'Email Input' });
        break;
      case 'number-input':
        this.formElements.push({ elementType: elementName, content: 'Number Input' });
        break;
      case 'pwd-input':
        this.formElements.push({ elementType: elementName, content: 'Password Input' });
        break;
      case 'radio-btn':
        this.formElements.push({ elementType: elementName, content: 'Radio Button' });
        break;
      case 'check-box':
        this.formElements.push({ elementType: elementName, content: 'Check Box' });
        break;
      case 'drop-down':
        this.formElements.push({ elementType: elementName, content: 'Drop Down' });
        break;
      case 'submit-btn':
        this.formElements.push({ elementType: elementName, content: 'Submit' });
        break;

      // TODO Add more cases for other form elements
    }
  }

  generateFormHtml(): string {
    let html = '<form>\n';
    for (const element of this.formElements) {
      switch (element.elementType) {
        case 'heading':
          html += `  <h1>${element.content}</h1>\n`;
          break;
        case 'label':
          html += `  <label>${element.content}</label>\n`;
          break;
        case 'text-input':
          html += `  <input type="text" placeholder="${element.content}" />\n`;
          break;
        case 'email-input':
          html += `  <input type="email" placeholder="${element.content}" />\n`;
          break;
        case 'number-input':
          html += `  <input type="number" placeholder="${element.content}" />\n`;
          break;
        case 'pwd-input':
          html += `  <input type="password" placeholder="${element.content}" />\n`;
          break;
        case 'radio-btn':
          html += `  <label>\n`;
          html += `    <span>${element.content}</span>\n`;
          html += `    <input type="radio" value="${element.content}" />\n`
          html += `  <label>\n`;
          break;
        case 'check-box':
          html += `  <label>\n`;
          html += `    <span>${element.content}</span>\n`;
          html += `    <input type="checkbox" value="${element.content}" />\n`
          html += `  <label>\n`;
          break;
        case 'drop-down':
          html += `  <select name="drop-down" id="drop-down">\n`;
          html += `    <option value="${element.content}">${element.content}</option>\n`;
          html += `  </select>\n`;
          break;
        case 'submit-btn':
          html += `  <input type="submit" value="${element.content}" />\n`;
          break;

        // TODO Add more cases for other form elements
      }
    }
    html += '</form>';
    return html;
  }

  generateFormCode() {
    this.generatedHTML = this.generateFormHtml();
  }

  copyHtmlCodeToClipboard() {
    if (this.generatedHTML) {
      this.clipboardService.copy(this.generatedHTML);
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Copied to clipboard',
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...!',
        text: 'Something went wrong',
        timer: 1000
      });
    }
  }

  changeTextContent(index: number, elementType: string) {
    this.closeAllCustomTextEditors();
    this.openCustomTextEditor(elementType);
    this.currentIndex = index;
  }
  
  changeTextContentInArray(event: MouseEvent){
    const target = event.currentTarget as HTMLElement;
    const targetElement = target.parentElement?.previousElementSibling as HTMLInputElement;

    if (targetElement) {
      this.formElements[this.currentIndex].content = targetElement.value;
    }

  }

  openCustomTextEditor(elementName: string) {
    switch (elementName) {
      case 'heading':
        this.showHeadingTextEditor = true;
        break;
      case 'label':
        this.showLabelTextEditor = true;
        break;
      case 'text-input':
        this.showTextInputTextEditor = true;
        break;
      case 'email-input':
        this.showEmailInputTextEditor = true;
        break;
      case 'number-input':
        this.showNumberInputTextEditor = true;
        break;
      case 'pwd-input':
        this.showPwdInputTextEditor = true;
        break;
      case 'radio-btn':
        this.showRadioButtonTextEditor = true;
        break;
      case 'check-box':
        this.showCheckBoxTextEditor = true;
        break;
      case 'drop-down':
        this.showDropDownOptionTextEditor = true;
        break;
      case 'submit-btn':
        this.showSubmitButtonTextEditor = true;
        break;

      // TODO Add more cases for other form elements
    }
  }

  removeElement(index: number, elementType: string) {
    if (index >= 0 && index < this.formElements.length) {
      this.formElements.splice(index, 1);
      this.closeIndividualCustomTextEditor(elementType);
    }
  }

  resetForm() {
    this.formElements = [];
    this.resetGeneratedHtml();
    this.closeAllCustomTextEditors();
  }

  resetGeneratedHtml() {
    this.generatedHTML = "";
  }

  closeIndividualCustomTextEditor(elementName: string) {
    switch (elementName) {
      case 'heading':
        this.showHeadingTextEditor = false;
        break;
      case 'label':
        this.showLabelTextEditor = false;
        break;
      case 'text-input':
        this.showTextInputTextEditor = false;
        break;
      case 'email-input':
        this.showEmailInputTextEditor = false;
        break;
      case 'number-input':
        this.showNumberInputTextEditor = false;
        break;
      case 'pwd-input':
        this.showPwdInputTextEditor = false;
        break;
      case 'radio-btn':
        this.showRadioButtonTextEditor = false;
        break;
      case 'check-box':
        this.showCheckBoxTextEditor = false;
        break;
      case 'drop-down':
        this.showDropDownOptionTextEditor = false;
        break;
      case 'submit-btn':
        this.showSubmitButtonTextEditor = false;
        break;

      // TODO Add more cases for other form elements
    }

    this.textVariable = "Enter Your Text";
  }

  closeAllCustomTextEditors() {
    this.showHeadingTextEditor = false;
    this.showLabelTextEditor = false;
    this.showTextInputTextEditor = false;
    this.showEmailInputTextEditor = false;
    this.showNumberInputTextEditor = false;
    this.showPwdInputTextEditor = false;
    this.showRadioButtonTextEditor = false;
    this.showCheckBoxTextEditor = false;
    this.showDropDownOptionTextEditor = false;
    this.showSubmitButtonTextEditor = false;

    this.textVariable = "Enter Your Text";
  }

}

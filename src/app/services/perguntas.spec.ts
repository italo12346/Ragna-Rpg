import { TestBed } from '@angular/core/testing';

import { Perguntas } from './perguntas';

describe('Perguntas', () => {
  let service: Perguntas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Perguntas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

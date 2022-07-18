package br.com.softvet.veterinaria.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import br.com.softvet.veterinaria.rest.exception.ApiErrors;

@RestControllerAdvice
public class ApplicationControllerAdvice {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiErrors handleValidationErrors(MethodArgumentNotValidException exception) {
		BindingResult bindingResult = exception.getBindingResult();
		List<String> messages = bindingResult.getAllErrors()
		.stream()
		.map( objectError -> objectError.getDefaultMessage())
		.collect(Collectors.toList());
		return new ApiErrors(messages);
		
	}
	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity handleResponseStatusException(ResponseStatusException exception) {
		String message = exception.getMessage();
		HttpStatus codigoStatus = exception.getStatus();
		ApiErrors apiErrors = new ApiErrors(message);
		return new ResponseEntity(apiErrors, codigoStatus);
	}
	

}

class BaseAppException(Exception):
    """Base category for all application-specific exceptions"""
    def __init__(self, message: str, status_code: int = 400, code: str = "BAD_REQUEST"):
        self.message = message
        self.status_code = status_code
        self.code = code
        super().__init__(self.message)

class AuthException(BaseAppException):
    """Exceptions related to authentication and authorization"""
    def __init__(self, message: str, status_code: int = 401, code: str = "UNAUTHORIZED"):
        super().__init__(message, status_code, code)

class ValidationException(BaseAppException):
    """Exceptions related to input data validation"""
    def __init__(self, message: str, status_code: int = 422, code: str = "VALIDATION_ERROR"):
        super().__init__(message, status_code, code)

class NotFoundException(BaseAppException):
    """Exceptions when a resource is not found"""
    def __init__(self, message: str, status_code: int = 404, code: str = "NOT_FOUND"):
        super().__init__(message, status_code, code)

class ServiceException(BaseAppException):
    """Exceptions from external services or internal processing failures (e.g. ML model)"""
    def __init__(self, message: str, status_code: int = 500, code: str = "INTERNAL_SERVICE_ERROR"):
        super().__init__(message, status_code, code)

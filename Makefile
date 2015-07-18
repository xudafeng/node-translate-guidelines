git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install startserver
pull:
	@git pull origin ${git_version}
push:
	@git push origin ${git_version}
server:
	@${npm_bin}/startserver
.PHONY: test

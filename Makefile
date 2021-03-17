YARN = yarn
YARNFLAGS= --frozen-lockfile --mutex network
EXCLUDE = ${exclude}
PROJECTS = $(filter-out $(EXCLUDE),$(patsubst projects/%, %, $(patsubst %/package.json, %, $(wildcard projects/*/package.json))))
.PHONY: list install clean validate-% fix-% test-% build-% validate fix test

#
# install deps
install: $(patsubst %, projects/%/node_modules, $(PROJECTS)) node_modules
projects/%/node_modules: projects/%/yarn.lock
	@echo "\n👟 Installing $*\n"
	cd $(dir $@) && ${YARN} ${YARNFLAGS}
node_modules: yarn.lock
	@echo "\n👟 Installing project tools\n"
	${YARN} ${YARNFLAGS}
#
# Build commands
validate: $(patsubst %, validate-%, $(PROJECTS))
fix: $(patsubst %, fix-%, $(PROJECTS))
build: $(patsubst %, build-%, $(PROJECTS))
test: $(patsubst %, test-%, $(PROJECTS))

#
# Overrides
#

build-Mallard:
	@echo "\n👟 $@ 🦆\n"
	@echo "\nThis is not yet handled by make\n"

validate-mallard:
	@echo "hello"	
	@echo "\n👟🧶 $@ ESLINT 🦆\n"
	cd projects/$* && yarn run lint
	@echo "\n👟🚂 $@ TSC 🦆\n"
	cd projects/$* && yarn tsc --noEmit --skipLibCheck

#
# Project commands
#
validate-%: projects/%/node_modules node_modules
	@echo "\n👟🧶 $@ ESLINT 🦆\n"
	yarn eslint 'projects/$*/**/*.{ts,tsx}' --parser-options=project:./projects/$*/tsconfig.json
	@echo "\n👟🚂 $@ TSC 🦆\n"
	yarn eslint 'projects/$*/**/*.{ts,tsx}' --parser-options=project:./projects/$*/tsconfig.json --fix
fix-%: node_modules projects/%/node_modules node_modules
	@echo "\n👟 $@ 🦆\n"
	cd projects/$* && yarn run lint --fix
test-%: projects/%/node_modules
	@echo "\n👟 $@ 🦆\n"
	cd projects/$* && yarn test
build-%: projects/%/node_modules
	@echo "\n👟 $@ 🦆\n"
	cd projects/$* && yarn build
#
# Misc
#
list:
	@echo  $(PROJECTS)
clean:
	@echo "\n🗑 cleaning\n"
	rm -rf projects/*/node_modules
	rm -rf node_modules
	rm projects/aws/bin/*.js projects/aws/bin/*.d.ts projects/aws/lib/*.js projects/aws/lib/*.d.ts
